function getSessionUserId() {
    return req.session.user_id; 
  };

  module.exports = { getSessionUserId }