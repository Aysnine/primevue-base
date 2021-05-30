import {
  belongsTo,
  createServer,
  Factory,
  Model,
  Response,
  Serializer
} from 'miragejs'
import { inflections } from 'inflected'
import { Gender } from '../api'

inflections('en', (inflect: any) => {
  inflect.irregular('campus', 'campuses')
})

export const makeServer = ({ environment = 'development' } = {}) => {
  const server = createServer({
    environment,

    models: {
      campus: Model,
      student: Model.extend({
        adminTeacher: belongsTo('teacher', { polymorphic: true }),
        baseCampus: belongsTo('campus', { polymorphic: true })
      }),
      teacher: Model.extend({
        baseCampus: belongsTo('campus', { polymorphic: true })
      })
    },

    serializers: {
      application: Serializer,
      teacher: Serializer.extend({
        include: ['campus'],
        embed: true
      }),
      student: Serializer.extend({
        include: ['adminTeacher', 'campus'],
        embed: true
      })
    },

    factories: {
      campus: Factory.extend({
        name: (i: number) => 'Campus ' + i
      }),
      student: Factory.extend({
        name: (i: number) => 'Student ' + i,
        gender: Gender.MALE,
        age: 12
      }),
      teacher: Factory.extend({
        name: (i: number) => 'Teacher ' + i
      })
    },

    seeds(server) {
      server.createList('campus', 5).forEach((campus) => {
        server
          .createList('teacher', 5, { baseCampus: campus })
          .forEach((teacher) => {
            server.createList('student', 5, {
              baseCampus: campus,
              adminTeacher: teacher
            })
          })
      })
    },

    routes() {
      this.namespace = 'api'

      this.get('/students', function (schema, req) {
        if (req.queryParams.pageIndex == '1') {
          return new Response(400)
        }

        return {
          total: 100,
          // @ts-ignore
          data: this.serialize(schema.all('student')).students
        }
      })

      this.get('/teachers', function (schema) {
        return {
          total: 100,
          data: schema.db.teachers
        }
      })

      this.get('/campuses', function (schema) {
        return {
          total: 100,
          data: schema.db.campuses
        }
      })

      this.passthrough()
    }
  })

  return server
}
