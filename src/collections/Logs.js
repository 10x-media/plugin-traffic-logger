export default function (incomingConfig) {
    return ({
        slug: 'logs',
        labels: {
            singular: 'Log',
            plural: 'Logs',
        },
        fields: [
            {
                name: 'type',
                label: 'Typ',
                type: 'select',
                options: [
                    {
                        label: 'Create',
                        value: 'create',
                    },
                    {
                        label: 'Read',
                        value: 'read',
                    },
                    {
                        label: 'Update',
                        value: 'update',
                    },
                    {
                        label: 'Delete',
                        value: 'delete',
                    },
                    {
                        label: 'Login',
                        value: 'login',
                    },
                    {
                        label: 'Logout',
                        value: 'logout',
                    },
                ]
            },
            {
                name: incomingConfig.admin.user,
                label: 'Benutzer',
                type: 'relationship',
                relationTo: incomingConfig.admin.user
            },
            {
                name: 'targetCollection',
                label: 'Collection',
                type: 'select',
                options: incomingConfig.collections.map(collection => ({
                    label: collection.labels?.plural || collection.slug,
                    value: collection.slug,
                })),
            },
            {
                name: 'targetDoc',
                label: 'Dokument',
                type: 'relationship',
                relationTo: incomingConfig.collections.map(collection => collection.slug),
            },
            {
                name: 'body',
                label: 'Inhalt',
                type: 'json',
            },
        ],
    })
}