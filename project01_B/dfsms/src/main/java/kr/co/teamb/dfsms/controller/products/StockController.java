package kr.co.teamb.dfsms.controller.products;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import kr.co.teamb.dfsms.cmn.PagingService;
import kr.co.teamb.dfsms.service.StockService;
import kr.co.teamb.dfsms.vo.CommunityVO;
import kr.co.teamb.dfsms.vo.HistoryVO;
import kr.co.teamb.dfsms.vo.PageVO;
import kr.co.teamb.dfsms.vo.UserVO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/stock")
public class StockController {
	@Autowired
	private StockService stockService;
	
	@Autowired
	private PagingService pagingService;

	@Value("${spring.servlet.multipart.location}")
	private String filePath;
	
	
//	1. 전체 상품 리스트
	@RequestMapping("/list")
	public Map<String, Object> selectProductList(@RequestParam Map<String, String> paramMap, HttpServletRequest request) {
//		현재 페이지에 따라 페이지 공식에 의해서 begin과 end를 구해서 페이징처리되어서 반환받은 데이터
		String cPage = paramMap.get("cPage");

		int totalCount = stockService.totCnt(paramMap); // 원래 비어있었는데 paramMap를 받음

		PageVO pageVO = pagingService.makePage(totalCount, cPage);

		Map<String, String> map = new HashMap<>(paramMap);
		map.put("begin", String.valueOf(pageVO.getBeginPerPage()));
		map.put("end", String.valueOf(pageVO.getEndPerPage()));

		List<Map<String, Object>> list = stockService.selectStockList(map);

//		Json으로 응답 처리 - 페이징 처리된 결과 리스트와 정보
		Map<String, Object> response = new HashMap<>();
		response.put("data", list);
		response.put("totalItems", pageVO.getTotalRecord());
		response.put("totalPages", pageVO.getTotalPage());
		response.put("currentPage", pageVO.getNowPage());
		response.put("startPage", pageVO.getStartPage());
		response.put("endPage", pageVO.getEndPage());

		return response;
	}
	
	@GetMapping("/delete")
	public void getMethodName(@RequestParam("num") int productid) {
		int delCnt = stockService.delProduct(productid);
		if(delCnt > 0) {
			System.out.println("상품 삭제 완료");
		}
	}
	
	
	@RequestMapping("/historylist")
	public Map<String, Object> listCommunity(
				@RequestParam Map<String, String> paramMap
				,HttpServletRequest req
			) 
	{
		String cPage = paramMap.get("cPage"); //currentPage
		int totCnt = stockService.historyTotCnt(paramMap); //searchType, searchValue
		//페이징 모듈을 사용해 처리된 값 vo에 setting
		PageVO pageVO = pagingService.makePage(totCnt, cPage);
		//map 초기화시 req 값 셋팅 : searchType, searchValue
		Map<String, String> map = new HashMap<>(paramMap);
		map.put("begin", String.valueOf(pageVO.getBeginPerPage()));
	    map.put("end", String.valueOf(pageVO.getEndPerPage()));
	    //셋팅된 조건값(searchType, searchValue, begin, end)을 함께 넘겨서 조회
	    List<HistoryVO> list = stockService.selectHistory(map);
	    //list 결과를 저장할 res
	    Map<String, Object> res = new HashMap<>();
	    res.put("data", list);
	    res.put("totalItems", pageVO.getTotalRecord());
	    res.put("totalPages", pageVO.getTotalPage());
	    res.put("currentPage", pageVO.getNowPage());
	    res.put("startPage", pageVO.getStartPage());
	    res.put("endPage", pageVO.getEndPage());
		//@RestController에 의해 자동으로 JSON 형식으로 클라이언트에 응답처리 됨
		return res;
	}
	
	@GetMapping("/detail")
	public HistoryVO detailHistory(@RequestParam("num") int historyid) {
		return  stockService.detailHistory(historyid);
	}
	
	@PostMapping("/update")
	public void getMethodName(HistoryVO vo, HttpSession ss) {
		UserVO uvo = (UserVO) ss.getAttribute("loginUser");
		if(uvo != null) vo.setUsrno(uvo.getUsrno()); //재고 수정자
		//int resCnt = stockService.updateHistory(vo);
		//if(resCnt > 0) System.out.println("상품 재고 업댓 완료");
		try {
			stockService.transcationProcess(vo);
			System.out.println("add product with img transaction process success!!!");
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Rollback...");
		}
	}
	
}
