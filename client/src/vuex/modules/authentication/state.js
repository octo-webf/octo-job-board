import auth from '@/services/auth';

export default {

	pending: false,
	isAuthenticated: !!auth.getToken(),
	userId: null,
	accessToken: auth.getToken(),
};
