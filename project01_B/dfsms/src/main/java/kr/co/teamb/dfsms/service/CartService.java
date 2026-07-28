package kr.co.teamb.dfsms.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.teamb.dfsms.dao.CartDao;
import kr.co.teamb.dfsms.vo.OrderVO;

@Service
public class CartService {
	@Autowired
	private CartDao cartDao;

	public void addCart(Map<String, String> map) {
		cartDao.addCart(map);
	}

	public int cartPValid(Map<String, String> map) {
		return cartDao.cartPValid(map);
	}
	
	public Map<String, Object> cartSValid(Map<String, String> map) {
		return cartDao.cartSValid(map);
	}

	public List<Map<String, Object>> cartList(Map<String, String> map) {
		return cartDao.cartList(map);
	}
	
	public void updateQty(Map<String, String> map) {
	    cartDao.updateQty(map);
	}
	
	public void delOneCartProduct(Map<String, String> map) {
		cartDao.delOneCartProduct(map);
	}
	
}
