package kr.co.teamb.dfsms.controller.mypage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.teamb.dfsms.service.MypageService;

@RestController
@RequestMapping("/api/mypage")
public class MypageController {
	@Autowired
	private MypageService mypageService;
	
	@GetMapping("/orderList")
	public Map<String, Object> orderHistory(@RequestParam Map<String, String> pMap) {
		//Map<String, String> map = new HashMap<>();
		//userInfo : 로그인기능 완료시 세션정보 받아오는걸로 수정 예정
		//pMap.put("usrno", "3");
		
		List<Map<String, Object>> orderList = mypageService.orderHistory(pMap);
		
		Map<String, Object> res = new HashMap<>();
		res.put("data", orderList);
		
		return res;
	}
}
