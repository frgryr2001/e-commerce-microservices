const isAdmin = (req, res, next) => {
	if (req.user.role !== 'admin') {
		return res
			.status(403)
			.json({ status: 'Thất bại', message: 'Bạn không có quyền truy cập API này!' });
	}
	next();
};

module.exports = isAdmin;
