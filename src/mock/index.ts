import {
  belongsTo,
  createServer,
  Factory,
  Model,
  Response,
  Serializer
} from 'miragejs'
import { Gender } from '../api'

export const makeServer = ({ environment = 'development' } = {}) => {
  const server = createServer({
    environment,

    models: {
      student: Model.extend({
        adminTeacher: belongsTo('teacher', { polymorphic: true })
      }),
      teacher: Model
    },

    serializers: {
      application: Serializer,
      student: Serializer.extend({
        include: ['adminTeacher'],
        embed: true
      })
    },

    factories: {
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
      server.createList('teacher', 5).forEach((teacher) => {
        server.createList('student', 5, { adminTeacher: teacher })
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

      this.passthrough()
    }
  })

  return server
}
