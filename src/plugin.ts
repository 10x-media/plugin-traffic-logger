//@ts-nocheck
import type { Config, Plugin } from 'payload/config'
import type { PluginTypes } from './types'

import Logs from './collections/Logs'

type PluginType = (pluginOptions: PluginTypes) => Plugin

export const pluginTrafficLogger =
  (pluginOptions: PluginTypes): Plugin =>
    (incomingConfig: Config) => {
      const newConfig = { ...incomingConfig }

      newConfig.collections = newConfig.collections.map(collectionConfig => {
        if (collectionConfig.slug === incomingConfig.admin.user) return collectionConfig
        return ({
          ...collectionConfig,
          hooks: {
            ...(collectionConfig.hooks || {}),
            afterChange: [
              ...(collectionConfig.hooks?.afterChange || []),
              ({ req, operation, doc }) => {
                const user = req.user
                if (!user) return
                console.log(req)
                payload.create({
                  collection: 'logs',
                  data: {
                    type: operation,
                    [incomingConfig.admin.user]: user.id,
                    targetCollection: collectionConfig.slug,
                    targetDoc: doc.id,
                  }
                })
              }
            ],
            afterRead: [
              ...(collectionConfig.hooks?.afterRead || []),
              ({ req }) => {
                const user = req.user
                if (!user) return
                console.log(req)
                payload.create({
                  collection: 'logs',
                  data: {
                    type: 'read',
                    [incomingConfig.admin.user]: user.id,
                    targetCollection: collectionConfig.slug,
                    targetDoc: req.params.id,
                  }
                })
              }
            ]
          },
        })
      })

      newConfig.collections = [
        ...(newConfig.collections || []),
        Logs(incomingConfig),
      ]

      return config
    }
