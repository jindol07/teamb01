package kr.co.teamb.dfsms.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.teamb.dfsms.dao.MyPageDao;
import kr.co.teamb.dfsms.vo.UserVO;

@Service
public class MypageService {
	@Autowired
	private MyPageDao myPageDao;

	public List<Map<String, Object>> orderHistory(Map<String, String> map) {
		
		List<Map<String, Object>> list = myPageDao.orderHistory(map);

		Map<Object, Map<String, Object>> grouped = new LinkedHashMap<>();

		for(Map<String, Object> item : list){

		    Object orderId = item.get("ORDERID");

		    if(!grouped.containsKey(orderId)){

		        Map<String, Object> order = new LinkedHashMap<>();

		        order.put("ORDERID", item.get("ORDERID"));
		        order.put("RDATE", item.get("RDATE"));
		        order.put("TOTPRICE", item.get("TOTPRICE"));
		        order.put("TITLE", item.get("TITLE"));

		        order.put("items", new ArrayList<Map<String,Object>>());

		        grouped.put(orderId, order);
		    }

		    List<Map<String,Object>> items = (List<Map<String,Object>>) grouped.get(orderId).get("items");

		    items.add(item);
		}
		
		return new ArrayList<>(grouped.values());
	}

	public int totCnt(Map<String, String> map) {
		return myPageDao.totCnt(map);
	}


	public int updateUserInfo(UserVO vo) {
		return myPageDao.updateUserInfo(vo);
	}

	public UserVO selectUsrInfo(UserVO vo) {
		return myPageDao.selectUsrInfo(vo);
	}

}
