import {
  login,
  sendCode,
  getUserInfo,
  getUserChannel
} from './user'
import {
  getArticles
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
// 用户接口
export const loginAPI = login
export const sendCodeAPI = sendCode
export const getUserInfoAPI = getUserInfo
export const getUserChannelAPI = getUserChannel
// 文章接口
export const getArticlesAPI = getArticles
// 频道接口
export const allChannelAPI = allChannel
export const updateChannelsAPI = updateChannels
export const deleteChannelAPI = deleteChannel
// 搜索接口
export const searchSuggestionAPI = searchSuggestion
export const searchResultAPI = searchResult
