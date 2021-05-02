import { Gender } from '../api'

export const EMPTY_TEXT = '&nbsp;'

export const GENDER_TEXT: Record<Gender, string> = {
  [Gender.FEMALE]: 'Female',
  [Gender.MALE]: 'Male'
}
