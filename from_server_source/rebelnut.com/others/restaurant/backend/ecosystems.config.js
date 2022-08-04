module.exports = {
    apps: [
        {
            name: 'store-admin',
            script: 'npm',
            args: 'start',
            env_production: {
                NODE_ENV: "production",
                BACKEND_URL: "/dna"
            },
            exp_backoff_restart_delay: 100,
        },
    ],
};