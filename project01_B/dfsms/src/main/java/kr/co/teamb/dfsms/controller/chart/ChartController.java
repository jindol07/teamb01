package kr.co.teamb.dfsms.controller.chart;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.teamb.dfsms.service.ChartService;
import kr.co.teamb.dfsms.vo.ChartVO;
import kr.co.teamb.dfsms.vo.UserVO;

@RestController
@RequestMapping("/api/chart")
public class ChartController {
	@Autowired
	private ChartService chartService;
	
	@GetMapping("/list")
	public Map<String, Object> chartList(@RequestParam Map<String, String> pMap, HttpSession ss) {
		Map<String, Object> res = new HashMap<>();
		//userInfo : 로그인기능 완료시 세션정보 받아오는걸로 수정 완료
		UserVO vo = (UserVO) ss.getAttribute("loginUser");
		if(vo == null) {
			List<ChartVO> bestList = chartService.bestItemList();
			res.put("bestdata", bestList);
		} else {
			List<ChartVO> bestList = chartService.bestItemList();
			res.put("bestdata", bestList);
			pMap.put("usrno", String.valueOf(vo.getUsrno()));
			pMap.put("birth", String.valueOf(vo.getBirth()));
			pMap.put("gender", String.valueOf(vo.getGender()));
			List<ChartVO> ctryList = chartService.ctgyGroupList(pMap);
			res.put("ctrydata", ctryList);

			// 1위 카테고리 기반 추천 상품 데이터 추가
			List<ChartVO> recommendProducts = new ArrayList<>();
			if (ctryList != null && !ctryList.isEmpty()) {
				int topCategoryId = ctryList.get(0).getCategoryid(); // 선호도 1위 카테고리 ID
				recommendProducts = chartService.getRecommendProducts(topCategoryId);
			}
			res.put("recommendProducts", recommendProducts); // 프론트로 전달
		}
		
		return res;
	}

}