export default {
	apps: [
		{
			name: 'nasa-api',
			cwd: 'C:/Users/Ojfirst/Documents/NASA/Server',
			script: 'scr/server.js',
			node_args: '--env-file=C:/Users/Ojfirst/Documents/NASA/Server/.env',

			instances: 'i max',
			exec_mode: 'cluster',
		},
	],
};
