/*
 * @Description: 
 * @Author: shaojia
 * @Date: 2021-11-09 18:06:37
 * @LastEditTime: 2021-11-09 19:14:08
 * @LastEditors: shaojia
 */
import { TestState } from 'pages/Test/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  test?: TestState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
