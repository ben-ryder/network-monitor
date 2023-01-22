import { Entity } from '@platformatic/sql-mapper';
import graphqlPlugin from '@platformatic/sql-graphql'
import { Test } from './types/Test'

declare module '@platformatic/sql-mapper' {
  interface Entities {
    test: Entity<Test>,
  }
}
