package kr.co.teamb.dfsms.controller.products;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.teamb.dfsms.service.CartService;
import kr.co.teamb.dfsms.vo.ValidVO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/cart")
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
	
	@GetMapping("/add")
	public ResponseEntity<ValidVO> cartAdd(@RequestParam Map<String, String> pMap) {
		//userInfo : 로그인기능 완료시 세션정보 받아오는걸로 수정 예정
		//pMap.put("usrno", "2");
		Map<String, Object> svalidRes = cartSValid(pMap);
		if(cartPValid(pMap) > 0) {
			return ResponseEntity.ok(new ValidVO("ALREADY_EXIST", "해당 상품은 이미 카트에 존재합니다.")); //해당 상품 카트에 존재
		} else if (Integer.parseInt(svalidRes.get("QTY").toString()) < 0) {
			return ResponseEntity.ok(new ValidVO("LACK_OF_QTY", "재고 수량이 요청하신 수량보다 부족합니다.\n수량을 다시 확인해 주세요.")); //해당 상품 재고 부족...
		}
		cartService.addCart(pMap); //productid, qty
		return ResponseEntity.ok(new ValidVO("SUCCESS", "해당 상품이 장바구니에 담겼습니다.")); //code, message
	}
	
	@GetMapping("/list")
	public Map<String, Object> cartList() {
		Map<String, String> map = new HashMap<>();
		//userInfo : 로그인기능 완료시 세션정보 받아오는걸로 수정 예정
		map.put("usrno", "2");
		
		Map<String, Object> res = new HashMap<>();
		
		List<Map<String, Object>> cartList = cartService.cartList(map);
		
		res.put("data", cartList);
		
		return res;
	}

}
