const createUser = `mutation MyMutation(
    $email: String!, 
    $user_id: ID!) {
    signupUser(email: $email, user_id: $user_id) {
      msg
    }
}`;

const getUser = `query MyQuery($user_id: ID!) {
  getuser(user_id: $user_id) {
    user_name
    user_display_name
    user_education
    user_interest
    user_point_private
    user_point_public
    user_verified
    user_bio
    gender
    birth_date
    image_url
    follower_count
    following_count
    post_count
  }
}`;

const getOppositeUser = `query MyQuery($my_id: String!, $user_id: String!) {
  getOppositeUser(my_id: $my_id, user_id: $user_id) {
    birth_date
    follow_already
    follower_count
    following_count
    gender
    image_url
    post_count
    user_bio
    user_display_name
    user_education
    user_interest
    user_name
    user_point_private
    user_point_public
    user_verified
  }
}`;

const updateUser = `mutation MyMutation(
  $image_url: String,
  $birth_date: String, 
  $gender: String, 
  $user_id: ID!, 
  $user_bio: String, 
  $user_display_name: String, 
  $user_education: String, 
  $user_interest: String, 
  $user_name: String) {
  updateUserProfile(input: {
    image_url:$image_url,
    birth_date: $birth_date, 
    gender: $gender, 
    user_id: $user_id, 
    user_bio: $user_bio, 
    user_display_name: $user_display_name, 
    user_education: $user_education, 
    user_interest: $user_interest, 
    user_name: $user_name}) {
    msg
  }
}`;

const createPost = `mutation MyMutation(
  $post_private: Boolean!,
  $post_description: String, 
  $post_end_time: String,
  $post_language: String, 
  $post_options: String!, 
  $post_required_explanation: Boolean!, 
  $post_required_min_responses: Int, 
  $post_start_time: String!, 
  $post_title: String!, 
  $post_type: String!,
  $post_category: [String], 
  $user_id: ID!) {
  createPost(input: {
    post_private: $post_private,
    post_end_time: $post_end_time, 
    post_options: $post_options, 
    post_required_explanation: $post_required_explanation, 
    post_required_min_responses: $post_required_min_responses, 
    post_start_time: $post_start_time, post_title: $post_title, 
    post_type: $post_type, 
    user_id: $user_id, 
    post_description: $post_description, 
    post_category :$post_category,
    post_language: $post_language}) {
    msg
  }
}`;

const getPosts = `query MyQuery($offset: Int!, $user_id: String!, $type: String!) {
  getAllPost(user_id: $user_id, offset: $offset, type: $type) {
    already_voted
    post_category
    post_description
    post_endtime
    post_id
    post_language
    post_private
    post_required_explanation
    post_required_min_responses
    post_starttime
    post_title
    post_type
    total_votes
    user_id
    user_image
    user_name
    post_status
    options {
      option
      option_id
      option_selector
      vote
    }
  }
}`;

const giveAns = `mutation MyMutation(
  $option_id: Int!, 
  $post_id: String!, 
  $user_id: String!,
  $explanation: String) {
  addResponse(input: {
    option_id: $option_id, 
    post_id: $post_id, 
    user_id: $user_id
    explanation: $explanation
  }) {
    msg
  }
}`;

const getUserPost = `query MyQuery($offset: Int, $user_id: String!, $my_id: String!) {
  getUserPost(offset: $offset, user_id: $user_id, my_id: $my_id) {
    already_voted
    options {
      option
      option_id
      option_selector
      vote
    }
    post_category
    post_description
    post_endtime
    post_id
    post_language
    post_private
    post_required_explanation
    post_required_min_responses
    post_starttime
    post_title
    post_type
    total_votes
    user_id
    user_image
    user_name
  }
}`;

const getUniquePost = `query MyQuery($post_id: String!, $user_id: String!) {
  getUniquePost(post_id: $post_id, user_id: $user_id) {
    post_id
    already_voted
    post_description
    post_category
    options {
      option
      option_id
      option_selector
      vote
    }
    post_endtime
    post_language
    post_private
    post_required_explanation
    post_required_min_responses
    post_starttime
    post_title
    post_type
    total_votes
    user_id
    user_image
    user_name
  }
}`;

const getFollowing = `query MyQuery($my_id: String!, $user_id: String!) {
  getFollowing(user_id: $user_id, my_id: $my_id) {
    user_id
    user_image
    username
    already_follow
  }
}`;

const getFollowers = `query MyQuery($my_id: String!, $user_id: String!) {
  getFollowers(user_id: $user_id, my_id: $my_id) {
    user_id
    user_image
    username
    already_follow
  }
}`;

const deletePost = `mutation MyMutation($post_id: String!) {
  deletePost(post_id: $post_id) {
    msg
  }
}`;

const followUser = `mutation MyMutation($follow_time: String!, $following_id: String!, $user_id: String!) {
  followUser(follow_time: $follow_time, following_id: $following_id, user_id: $user_id) {
    msg
  }
}
`;

const unFollowUser = `mutation MyMutation($following_id: String!, $user_id: String!) {
  unFollowUser(following_id: $following_id, user_id: $user_id) {
    msg
  }
}`;

const getPostExplanation = `query MyQuery($post_id: String!) {
  getPostExplanation(post_id: $post_id) {
    explanation
    user_id
    user_image
    user_name
  }
}
`;

const getEducation = `query MyQuery {
  getEducation {
    education_name
  }
}`;

const updateToken = `mutation MyMutation($user_id: String!, $token: String!) {
  updateToken(user_id: $user_id, token: $token) {
    msg
  }
}`;

const deleteToken = `mutation MyMutation($user_id: String!) {
  deleteToken(user_id: $user_id) {
    msg
  }
}`;

const getNotifications = `query MyQuery($offset: Int!,$user_id: String!) {
  getNotification(offset: $offset,user_id: $user_id) {
    created_at
    notification_id
    notification_text
    user_id
    user_image
    user_name
    opposite_user_id
    post_id
    type
  }
}`;

const deleteNotification = `mutation MyMutation($notification_id: String!) {
  deleteNotification(notification_id: $notification_id) {
    msg
  }
}`;

const deleteAllNotification = `mutation MyMutation($user_id: String!) {
  deleteAllNotification(user_id: $user_id) {
    msg
  }
}`;

const getAllSurvey = `query MyQuery($user_id: String!, $offset: Int) {
  getAllSurvey(user_id: $user_id, offset: $offset) {
    created_at
    isSubmitted
    survey_id
    survey_title
    user_id
    user_image
    user_name
  }
}`;

const getUniqueSurvey = `query MyQuery($survey_id: String!) {
  getUniqueSurvey(survey_id: $survey_id) {
    created_at
    survey_id
    survey_title
    user_image
    user_name
    user_id
    questions {
      question
      question_id
      totalVote
      options {
        is_image
        option
        optionVote
        option_id
        option_selector
      }
    }
  }
}`;

const createSurvey = `mutation MyMutation($options: String!, $start_time: String!, $survey_title: String!, $user_id: String!) {
  createSurvey(input: {options: $options, start_time: $start_time, survey_title: $survey_title, user_id: $user_id}) {
    msg
  }
}`;

const getUserSurvey =`query MyQuery($offset: Int, $user_id: String!) {
  getUserSurvey(user_id: $user_id, offset: $offset) {
    created_at
    isSubmitted
    survey_id
    survey_title
    user_id
    user_image
    user_name
  }
}`

export const Query = {
  createUser,
  getUser,
  getOppositeUser,
  updateUser,
  createPost,
  deletePost,
  getUniquePost,
  getPosts,
  giveAns,
  getUserPost,
  getFollowing,
  getFollowers,
  unFollowUser,
  followUser,
  getPostExplanation,
  getEducation,
  updateToken,
  deleteToken,
  getNotifications,
  deleteNotification,
  deleteAllNotification,
  getAllSurvey,
  getUniqueSurvey,
  createSurvey,
  getUserSurvey
};
