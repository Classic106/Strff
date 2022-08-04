module.exports = {
    apps: [
        {
            name: 'store',
            script: 'npm',
            args: 'start',
            exp_backoff_restart_delay: 100,
        },
    ],
};