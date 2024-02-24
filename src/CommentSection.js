import React, { useState, useEffect } from 'react';
import './CommentSection.css'; // Import CSS file for styling

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTexts, setReplyTexts] = useState([]);

  useEffect(() => {
    // Simulate fetching comments with timestamps
    const initialComments = [
      {
        text: 'This is the first comment.',
        timestamp: new Date().getTime(),
        replies: [],
      },
    ];
    setComments(initialComments);
    setReplyTexts(Array(initialComments.length).fill('')); // Initialize reply texts array
  }, []);

  const handleAddComment = () => {
    // Create a new object for the new comment
    const newCommentObject = {
      text: newComment,
      timestamp: Date.now(),
      replies: [],
    };

    // Update the state by adding the new comment object to the existing comments array
    setComments([...comments, newCommentObject]);
    setNewComment(''); // Clear the input field after adding the comment
    setReplyTexts([...replyTexts, '']); // Add a placeholder for the new comment's reply text
  };

  const handleDeleteComment = (index) => {
    // Delete comment at specified index
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
    const updatedReplyTexts = [...replyTexts];
    updatedReplyTexts.splice(index, 1); // Remove corresponding reply text
    setReplyTexts(updatedReplyTexts);
  };

  const handleReply = (index) => {
    // Add reply to specified comment
    const updatedComments = [...comments];
    updatedComments[index].replies.push({ text: replyTexts[index], timestamp: Date.now() });
    setComments(updatedComments);

    // Clear the reply input field after adding the reply
    const updatedReplyTexts = [...replyTexts];
    updatedReplyTexts[index] = ''; // Clear reply text for the specified comment
    setReplyTexts(updatedReplyTexts);
  };

  const sortByDate = () => {
    // Sort comments and replies by timestamp in descending order (newest first)
    const sortedComments = [...comments].sort((a, b) => b.timestamp - a.timestamp);
    sortedComments.forEach((comment) => {
      comment.replies.sort((a, b) => b.timestamp - a.timestamp);
    });
    setComments(sortedComments);
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <div className="sort-buttons">
        <button onClick={sortByDate}>Sort by Date</button>
      </div>
      <ul className="comments-list">
        {comments.map((comment, index) => (
          <li key={index} className="comment">
            <div>{comment.text}</div>
            {comment.timestamp && ( // Only display timestamp if it exists
              <div className="comment-info">
                <span>{new Date(comment.timestamp).toLocaleString()}</span>
              </div>
            )}
            <button onClick={() => handleDeleteComment(index)} className="delete-btn">
              Delete
            </button>
            <div className="reply-section">
              <input
                type="text"
                value={replyTexts[index]}
                onChange={(e) => {
                  const updatedReplyTexts = [...replyTexts];
                  updatedReplyTexts[index] = e.target.value;
                  setReplyTexts(updatedReplyTexts);
                }}
                placeholder="Reply"
              />
              <button onClick={() => handleReply(index)} className="reply-btn">
                Reply
              </button>
            </div>
            <ul className="replies-list">
              {comment.replies.map((reply, replyIndex) => (
                <li key={replyIndex} className="reply">
                  <div>{reply.text}</div>
                  {reply.timestamp && ( // Only display timestamp if it exists
                    <div className="reply-info">
                      <span>{new Date(reply.timestamp).toLocaleString()}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="add-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
