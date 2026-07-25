package kr.co.teamb.dfsms.controller.order;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.teamb.dfsms.service.CartService;
import kr.co.teamb.dfsms.service.OrderService;
import kr.co.teamb.dfsms.vo.OrderItemsVO;
import kr.co.teamb.dfsms.vo.OrderVO;
import kr.co.teamb.dfsms.vo.ValidVO;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/order")
public class OrderController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private CartService cartService;
	
	//@GetMapping("/add")
	//public ResponseEntity<Boolean> addOrder() {
	@PostMapping("/add")
	public ResponseEntity<ValidVO> addOrder(OrderVO ovo) {
		Map<String, String> map = new HashMap<>();
		//userInfo : 로그인기능 완료시 세션정보 받아오는걸로 수정 예정
		map.put("usrno", String.valueOf(ovo.getUsrno()));
		
		List<OrderItemsVO> oivoList = new ArrayList<>();
		int totPrice = 0;
		int leftQty = 0;
		
		for(Map<String, Object> item : cartService.cartList(map)) {
			OrderItemsVO oivo = new OrderItemsVO();
			Map<String, String> tMap = new HashMap<>();
			oivo.setPrice(((Number) item.get("PRICE")).intValue());
			oivo.setProductid(((Number) item.get("PRODUCTID")).intValue());
			oivo.setQty(((Number) item.get("QTY")).intValue());
			//주문시 재고량 검증 추가 s 0725
			tMap.put("productid", String.valueOf(oivo.getProductid()));
			tMap.put("qty", String.valueOf(oivo.getQty()));
			leftQty = Integer.parseInt(cartService.cartSValid(tMap).get("QTY").toString());
			if (leftQty < 0) return ResponseEntity.ok(new ValidVO("LACK_OF_QTY", "해당 상품 재고량이 부족합니다.\n수량을 다시 선택해 주세요."));
			//주문시 재고량 검증 추가 e
			oivo.setPqty(((Number) item.get("PQTY")).intValue());
			oivo.setPnm(item.get("PNM").toString());
			oivo.setTitle(item.get("TITLE").toString());
			oivo.setCont(item.get("CONT").toString());
			oivo.setCategoryid(((Number) item.get("CATEGORYID")).intValue());
			totPrice += ((Number) item.get("SUBTOT")).intValue();
			oivoList.add(oivo);
		}
		
		ovo.setTotprice(totPrice);
		ovo.setOrderitemlist(oivoList);
		
		//트랜젝션
		try {
			orderService.transcationProcess(ovo, oivoList);
			System.out.println("add order with orderitems transaction success!!!");
		} catch (Exception e) {
			System.out.println("Rollback...");
			e.printStackTrace();
		}
		return ResponseEntity.ok(new ValidVO("SUCCESS", "상품 구매가 완료되었습니다."));
	}
}
