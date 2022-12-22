import {
  login,
  sendCode,
  getUserInfo,
  getUserChannel,
  addFollows,
  deleteFollows,
  getUserProfile,
  editUserProfile,
  editUserAvatar
} from './user'
import {
  getArticles,
  getArticlesDetail,
  collectArticle,
  cancelArticle,
  likeArticle,
  cancelLikeArticle
} from './articles'
import {
  allChannel,
  updateChannels,
  deleteChannel
} from './channel'
import {
  searchSuggestion,
  searchResult
} from './search'
import {
  getCommentList,
  commentLike,
  cancelCommentLike,
  addComment
} from './comment'
// 用户接口
export const loginAPI = login
export const sendCodeAPI = sendCode
export const getUserInfoAPI = getUserInfo
export const getUserChannelAPI = getUserChannel
export const addFollowsAPI = addFollows
export const deleteFollowsAPI = deleteFollows
export const getUserProfileAPI = getUserProfile
export const editUserProfileAPI = editUserProfile
export const editUserAvatarAPI = editUserAvatar
// 文章接口
export const getArticlesAPI = getArticles
export const getArticlesDetailAPI = getArticlesDetail
export const collectArticleAPI = collectArticle
export const cancelArticleAPI = cancelArticle
export const likeArticleAPI = likeArticle
export const cancelLikeArticleAPI = cancelLikeArticle
// 频道接口
export const allChannelAPI = allChannel
export const updateChannelsAPI = updateChannels
export const deleteChannelAPI = deleteChannel
// 搜索接口
export const searchSuggestionAPI = searchSuggestion
export const searchResultAPI = searchResult
// 评论接口
export const getCommentListAPI = getCommentList
export const commentLikeAPI = commentLike
export const cancelCommentLikeAPI = cancelCommentLike
export const addCommentAPI = addComment
