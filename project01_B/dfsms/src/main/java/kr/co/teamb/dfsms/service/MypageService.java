package kr.co.teamb.dfsms.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.teamb.dfsms.dao.MyPageDao;

@Service
public class MypageService {
	@Autowired
	private MyPageDao myPageDao;

	public List<Map<String, Object>> orderHistory(Map<String, String> map) {
		return myPageDao.orderHistory(map);
	}

}
