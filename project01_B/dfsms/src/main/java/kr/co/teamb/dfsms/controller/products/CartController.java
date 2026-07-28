package kr.co.teamb.dfsms.controller.products;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.teamb.dfsms.service.CartService;
import kr.co.teamb.dfsms.vo.UserVO;
import kr.co.teamb.dfsms.vo.ValidVO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/cart")
public class CartController {
	@Autowired
	private CartService cartService;
	
	//담을 상품 장바구니 존재 여부 검증
	public int cartPValid(Map<String, String> pMap) {
		return cartService.cartPValid(pMap);
	}
	
	//담을 상품 장바구니 남아있는 재고 수량 검증
	public Map<String, Object> cartSValid(Map<String, String> pMap) {
		return cartService.cartSValid(pMap);
	}
	
	//PostMan 테스트시 input param : productid, qty
	@GetMapping("/add")
	public ResponseEntity<ValidVO> cartAdd(@RequestParam Map<String, String> pMap, HttpSession ss) {
		//userInfo : 로그인기능 완료시 세션정보 받아오는걸로 수정 완료
		UserVO vo = (UserVO) ss.getAttribute("loginUser");
		
		if(vo == null) {
			return ResponseEntity.ok(new ValidVO("NO_USR_INFO", "로그인 페이지로 이동하시겠습니까?")); 
		} else if(vo.getRole() == 'A') {
			return ResponseEntity.ok(new ValidVO("NO_MATCHED_ROLE", "해당 기능은 관리자가 이용하실 수 없습니다."));
		} else {
			pMap.put("usrno", String.valueOf(vo.getUsrno()));
		}
		
		
		
		if(cartPValid(pMap) > 0) {
			return ResponseEntity.ok(new ValidVO("ALREADY_EXIST", "해당 상품은 이미 카트에 존재합니다.")); //해당 상품 카트에 존재
		}
		
		Map<String, Object> svalidRes = cartSValid(pMap);
		
		if (Integer.parseInt(svalidRes.get("QTY").toString()) < 0) {
			return ResponseEntity.ok(new ValidVO("LACK_OF_QTY", "재고 수량이 요청하신 수량보다 부족합니다.\n수량을 다시 확인해 주세요.")); //해당 상품 재고 부족...
		}
		
		cartService.addCart(pMap); //productid, qty
		return ResponseEntity.ok(new ValidVO("SUCCESS", "해당 상품이 장바구니에 담겼습니다.")); //code, message
	}
	
	// 장바구니에 담긴 상품의 수량 증감 메서드
	@GetMapping("/updateQty")
	public ResponseEntity<ValidVO> updateQty(@RequestParam Map<String, String> pMap, HttpSession ss) {
	    UserVO vo = (UserVO) ss.getAttribute("loginUser");
	    
		if(vo == null) {
			return ResponseEntity.ok(new ValidVO("NO_USR_INFO", "로그인 페이지로 이동하시겠습니까?"));
		} else if(vo.getRole() == 'A') {
			return ResponseEntity.ok(new ValidVO("NO_MATCHED_ROLE", "해당 기능은 관리자가 이용하실 수 없습니다."));
		} else {
			pMap.put("usrno", String.valueOf(vo.getUsrno()));
		}

	    // React에서 넘어온 증감량
	    int delta = Integer.parseInt(pMap.get("qty"));

	    // +버튼 눌렀을 때 재고 검사
	    if (delta > 0) {
	        Map<String, Object> svalidRes = cartService.cartSValid(pMap);
	        
	        if (Integer.parseInt(svalidRes.get("QTY").toString()) < 0) {
	            return ResponseEntity.ok(new ValidVO("LACK_OF_QTY","재고가 부족합니다."));
	        }
	        
	    }
	    // 수량 변경
	    cartService.updateQty(pMap);
	    return ResponseEntity.ok(new ValidVO("SUCCESS", "수량이 변경되었습니다."));
	}
	
	// 장바구니 상품 하나 삭제
	@GetMapping("/delOneCartProduct")
	public ResponseEntity<ValidVO> delOneCartProduct(@RequestParam Map<String, String> pMap, HttpSession ss) {
		UserVO vo = (UserVO) ss.getAttribute("loginUser");
			
		if(vo == null) {
			return ResponseEntity.ok(new ValidVO("NO_USR_INFO", "로그인 페이지로 이동하시겠습니까?"));
		} else if(vo.getRole() == 'A') {
			return ResponseEntity.ok(new ValidVO("NO_MATCHED_ROLE", "해당 기능은 관리자가 이용하실 수 없습니다."));
		} else {
			pMap.put("usrno", String.valueOf(vo.getUsrno()));
		}
		// 단일 상품 삭제
		cartService.delOneCartProduct(pMap);
		return ResponseEntity.ok(new ValidVO("SUCCESS", "상품이 장바구니에서 삭제되었습니다."));
	}
	
	//PostMan 테스트시 input param : x
	@GetMapping("/list")
	public Map<String, Object> cartList(@RequestParam Map<String, String> pMap, HttpSession ss) {
		Map<String, Object> res = new HashMap<>();
		//userInfo : 로그인기능 완료시 세션정보 받아오는걸로 수정 완료
		UserVO vo = (UserVO) ss.getAttribute("loginUser");
		if(vo == null) {
			res.put("error", "로그인 정보가 없습니다.");
			return res;
		} else {
			pMap.put("usrno", String.valueOf(vo.getUsrno()));
		}
		
		List<Map<String, Object>> cartList = cartService.cartList(pMap);
		
		res.put("data", cartList);
		
		return res;
	}

}
