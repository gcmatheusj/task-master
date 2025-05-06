import { Hono } from 'hono'

import { zValidator } from '@hono/zod-validator'

import { sessionMiddleware } from '../auth/sessionMiddleware'
import { createTeamSchema } from './schemas/create-team'
import { updateTeamSchema } from './schemas/update-team'

import { prisma } from '@/lib/prisma'
import { MemberRole } from '@prisma/client'
import { generateInviteCode } from '@/lib/utils'

const app = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const user = c.get('user')

    const members = await prisma.member.findMany({
      where: {
        userId: user.id as string
      },
      include: {
        team: true
      }
    })

    const teams = members.map(member => ({
      ...member.team
    }))

    return c.json({
      data: teams
    })
  })
  .post(
    '/', 
    sessionMiddleware,
    zValidator('json', createTeamSchema),
    async (c) => {
      const user = c.get('user')

      const { name, image } = c.req.valid('json')

      const team = await prisma.team.create({
        data: {
          name,
          userId: user.id as string,
          inviteCode: generateInviteCode(6),
          image: image as string
        }
      })

      await prisma.member.create({
        data: {
          userId: user.id as string,
          teamId: team.id,
          role: MemberRole.ADMIN
        }
      })

      return c.json({
        data: team
      })
    }
  )
  .post(
    '/:teamId/reset-invite-code',
    sessionMiddleware,
    async (c) => {
      const user = c.get('user')

      const { teamId } = c.req.param()

      const member = await prisma.member.findFirst({
        where: {
          userId: user.id as string,
          teamId
        }
      })

      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json({
          message: 'Você não tem permissão para atualizar o código de convite'
        }, 403)
      }

      const team = await prisma.team.update({
        where: {
          id: teamId
        },
        data: {
          inviteCode: generateInviteCode(6)
        }
      })

      return c.json({
        data: team
      })
    }
  )
  .patch(
    '/:teamId',
    sessionMiddleware,
    zValidator('json', updateTeamSchema),
    async (c) => {
      const user = c.get('user')

      const { teamId } = c.req.param()
      const { name, image } = c.req.valid('json')

      const member = await prisma.member.findFirst({
        where: {
          userId: user.id as string,
          teamId
        }
      })

      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json({
          message: 'Você não tem permissão para editar este time'
        }, 403)
      }

      const team = await prisma.team.update({
        where: {
          id: teamId
        },
        data: {
          name,
          image: image as string
        }
      })

      return c.json({
        data: team
      })
    }
  )
  .delete(
    '/:teamId',
    sessionMiddleware,
    async (c) => {
      const user = c.get('user')

      const { teamId } = c.req.param()

      const member = await prisma.member.findFirst({
        where: {
          userId: user.id as string,
          teamId
        }
      })

      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json({
          message: 'Você não tem permissão para editar este time'
        }, 403)
      }

      await prisma.team.delete({
        where: {
          id: teamId
        }
      })

      return c.json({
        data: {
          id: teamId
        }
      })
    }
  )

export default app