import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        phaser: ['phaser']
                    }
                }
            },
        },
        server: {
            port: 8080,
            watch: {
              usePolling: true
            }
        },
        resolve: {
            alias: [
                { find: '@', replacement: '/src' },
            ],
        },
        define: {
            'import.meta.env.COMMIT_HASH': JSON.stringify(process.env.COMMIT_HASH)
        }
    }
})