/**
 *
 * @authors lawrence998
 * @description 定义过滤器模块
 */

import Vue from 'vue';

import { formatDate } from 'utils';
/**
 * [formateTime description]
 * @param  {[type]} timeStamp [description]
 * @param  {[type]} fmt       [description]
 * @return {[type]}           [description]
 */
export function formatTime(timeStamp: number, fmt?: string) {
  return formatDate(timeStamp, fmt);
}

// register global utility filters.
const filters = {
  formatDate
};

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
