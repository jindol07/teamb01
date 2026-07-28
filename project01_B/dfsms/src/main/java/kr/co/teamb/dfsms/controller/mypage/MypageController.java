package kr.co.teamb.dfsms.controller.mypage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.teamb.dfsms.cmn.PagingService;
import kr.co.teamb.dfsms.service.MypageService;
import kr.co.teamb.dfsms.vo.PageVO;
import kr.co.teamb.dfsms.vo.UserVO;

@RestController
@RequestMapping("/api/mypage")
public class MypageController {
	@Autowired
	private MypageService mypageService;
	@Autowired
	private PagingService pagingService;
	
	@GetMapping("/orderList")
	public Map<String, Object> orderHistory(@RequestParam Map<String, String> pMap, HttpSession ss) {
//		현재 페이지에 따라 페이지 공식에 의해서 begin과 end를 구해서 페이징처리되어서 반환받은 데이터
		String cPage = pMap.get("cPage");
		
		//userInfo : 로그인기능 완료시 세션정보 받아오는걸로 수정 완료
		UserVO vo = (UserVO) ss.getAttribute("loginUser");
		if(vo != null) {
			pMap.put("usrno", String.valueOf(vo.getUsrno()));
		}
		
		int totalCount = mypageService.totCnt(pMap);
		PageVO pageVO = pagingService.makePage(totalCount, cPage);
		
		Map<String, String> map = new HashMap<>(pMap);
		map.put("usrno", pMap.get("usrno"));
		map.put("begin", String.valueOf(pageVO.getBeginPerPage()));
		map.put("end", String.valueOf(pageVO.getEndPerPage()));
		
		List<Map<String, Object>> orderList = mypageService.orderHistory(map);
		
//		Json으로 응답 처리 - 페이징 처리된 결과 리스트와 정보
		Map<String, Object> res = new HashMap<>();
		res.put("data", orderList);
		res.put("totalItems", pageVO.getTotalRecord());
		res.put("totalPages", pageVO.getTotalPage());
		res.put("currentPage", pageVO.getNowPage());
		res.put("startPage", pageVO.getStartPage());
		res.put("endPage", pageVO.getEndPage());
		
		return res;
	}
	
	@GetMapping("/selinfo")
	public UserVO getMethodName(HttpSession ss) {
		UserVO vo = (UserVO) ss.getAttribute("loginUser");
		if (vo == null) 
		{
	        return null;
	    }
		return mypageService.selectUsrInfo(vo);
	}
	
	@PostMapping("/usrinfo")
	public UserVO getUsrinfo(@RequestBody UserVO vo, HttpSession ss) {
		UserVO vot = (UserVO) ss.getAttribute("loginUser");
		vo.setUsrno(vot.getUsrno());
		if(vo != null) 
		{
			int resCnt = mypageService.updateUserInfo(vo);
			if(resCnt > 0) System.out.println("업데이트 성공");
		}
		return null;
	}
}
