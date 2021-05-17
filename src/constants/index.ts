import { Gender, Grade, Period } from '../api'

export const EMPTY_TEXT = '&nbsp;'

export const GENDER_TEXT: Record<Gender, string> = {
  [Gender.FEMALE]: 'Female',
  [Gender.MALE]: 'Male'
}

export const PERIOD_TEXT: Record<Period, string> = {
  [Period.PRIMARY]: 'Primary',
  [Period.JUNIOR]: 'Junior',
  [Period.HIGHER]: 'Higher',
  [Period.UNIVERSITY]: 'University'
}

export const GRADE_TEXT: Record<Grade, string> = {
  [Grade.FIRST_PRIMARY]: 'First Grade',
  [Grade.SECOND_PRIMARY]: 'Second Grade',
  [Grade.THIRD_PRIMARY]: 'Third Grade',
  [Grade.FOURTH_PRIMARY]: 'Fourth Grade',
  [Grade.FIFTH_PRIMARY]: 'Fifth Grade',
  [Grade.SIXTH_PRIMARY]: 'Sixth Grade',
  [Grade.FIRST_JUNIOR]: 'First Junior',
  [Grade.SECOND_JUNIOR]: 'Second Junior',
  [Grade.THIRD_JUNIOR]: 'Third Junior',
  [Grade.FIRST_HIGHER]: 'First Higher',
  [Grade.SECOND_HIGHER]: 'Second Higher',
  [Grade.THIRD_HIGHER]: 'Third Higher',
  [Grade.FIRST_UNIVERSITY]: 'First University',
  [Grade.SECOND_UNIVERSITY]: 'Second University',
  [Grade.THIRD_UNIVERSITY]: 'Third University',
  [Grade.FOURTH_UNIVERSITY]: 'Fourth University'
}

export const GRADES_OF_PERIOD: Record<Period, Array<Grade>> = {
  PRIMARY: [
    Grade.FIRST_PRIMARY,
    Grade.SECOND_PRIMARY,
    Grade.THIRD_PRIMARY,
    Grade.FOURTH_PRIMARY,
    Grade.FIFTH_PRIMARY,
    Grade.SIXTH_PRIMARY
  ],
  JUNIOR: [Grade.FIRST_JUNIOR, Grade.SECOND_JUNIOR, Grade.THIRD_JUNIOR],
  HIGHER: [Grade.FIRST_HIGHER, Grade.SECOND_HIGHER, Grade.THIRD_HIGHER],
  UNIVERSITY: [
    Grade.FIRST_UNIVERSITY,
    Grade.SECOND_UNIVERSITY,
    Grade.THIRD_UNIVERSITY,
    Grade.FOURTH_UNIVERSITY
  ]
}
