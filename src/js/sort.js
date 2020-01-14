import {SORTS} from './storage.js';

export function sortList(list, sort) {
    list.sort(SORTS[sort]) 
}