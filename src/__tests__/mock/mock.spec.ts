import { describe, it, expect, beforeEach } from 'vitest'
import {
  register,
  registerResource,
  executeMock,
  clear,
  type MockContext,
  type MockResponse,
} from '@/mock/core'

describe('Mock Core', () => {
  beforeEach(() => {
    clear()
  })

  describe('register', () => {
    it('should register a simple GET handler', async () => {
      register('GET', '/api/test', {
        response: { code: 200, message: 'success', data: { id: 1 } },
      })

      const result = await executeMock('GET', '/api/test')
      expect(result).not.toBeNull()
      expect(result?.response).toEqual({ code: 200, message: 'success', data: { id: 1 } })
    })

    it('should register with method-specific handlers', async () => {
      register('GET', '/api/resource', {
        response: { code: 200, data: 'get' },
      })
      register('POST', '/api/resource', {
        response: { code: 201, data: 'post' },
      })

      const getResult = await executeMock('GET', '/api/resource')
      const postResult = await executeMock('POST', '/api/resource')

      expect(getResult?.response.data).toBe('get')
      expect(postResult?.response.data).toBe('post')
    })

    it('should support path parameters', async () => {
      register('GET', '/api/users/:id', {
        response: (ctx: MockContext) => ({
          code: 200,
          data: { id: ctx.params.id },
        }),
      })

      const result = await executeMock('GET', '/api/users/123')
      expect(result?.response.data).toEqual({ id: '123' })
    })

    it('should support query parameters', async () => {
      register('GET', '/api/search', {
        response: (ctx: MockContext) => ({
          code: 200,
          data: { keyword: ctx.query.keyword },
        }),
      })

      const result = await executeMock('GET', '/api/search?keyword=test')
      expect(result?.response.data).toEqual({ keyword: 'test' })
    })

    it('should support request body', async () => {
      register('POST', '/api/create', {
        response: (ctx: MockContext) => ({
          code: 200,
          data: ctx.body,
        }),
      })

      const result = await executeMock('POST', '/api/create', {
        data: { name: 'test' },
      })
      expect(result?.response.data).toEqual({ name: 'test' })
    })

    it('should return null for unmatched routes', async () => {
      const result = await executeMock('GET', '/api/non-existent')
      expect(result).toBeNull()
    })
  })

  describe('registerResource', () => {
    it('should register RESTful resource handlers', async () => {
      const resourceHandler = {
        index: (): MockResponse => ({ code: 200, data: 'list' }),
        show: (ctx: MockContext): MockResponse => ({ code: 200, data: ctx.params.id }),
        create: (ctx: MockContext): MockResponse => ({ code: 201, data: ctx.body }),
        update: (ctx: MockContext): MockResponse => ({ code: 200, data: { id: ctx.params.id, ...ctx.body } }),
        destroy: (ctx: MockContext): MockResponse => ({ code: 200, data: { deleted: ctx.params.id } }),
      }

      registerResource('/api/items', resourceHandler)

      const index = await executeMock('GET', '/api/items')
      expect(index?.response.data).toBe('list')

      const show = await executeMock('GET', '/api/items/123')
      expect(show?.response.data).toBe('123')

      const create = await executeMock('POST', '/api/items', { data: { name: 'new' } })
      expect(create?.response.data).toEqual({ name: 'new' })

      const update = await executeMock('PUT', '/api/items/123', { data: { name: 'updated' } })
      expect(update?.response.data).toEqual({ id: '123', name: 'updated' })

      const destroy = await executeMock('DELETE', '/api/items/123')
      expect(destroy?.response.data).toEqual({ deleted: '123' })
    })
  })

  describe('delay', () => {
    it('should use default delay when not specified', async () => {
      register('GET', '/api/test', {
        response: { code: 200 },
      })

      const result = await executeMock('GET', '/api/test')
      expect(result?.delay).toBe(300)
    })

    it('should use specified fixed delay', async () => {
      register('GET', '/api/test', {
        response: { code: 200 },
        delay: 500,
      })

      const result = await executeMock('GET', '/api/test')
      expect(result?.delay).toBe(500)
    })

    it('should generate random delay within range', async () => {
      register('GET', '/api/test', {
        response: { code: 200 },
        delay: [100, 200],
      })

      const result = await executeMock('GET', '/api/test')
      expect(result?.delay).toBeGreaterThanOrEqual(100)
      expect(result?.delay).toBeLessThanOrEqual(200)
    })
  })

  describe('enabled', () => {
    it('should respect enabled flag', async () => {
      register('GET', '/api/enabled', {
        response: { code: 200 },
        enabled: true,
      })

      register('GET', '/api/disabled', {
        response: { code: 200 },
        enabled: false,
      })

      const enabled = await executeMock('GET', '/api/enabled')
      const disabled = await executeMock('GET', '/api/disabled')

      expect(enabled).not.toBeNull()
      expect(disabled).toBeNull()
    })
  })
})
