package kr.co.teamb.dfsms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.teamb.dfsms.dao.TopChartDao;
import kr.co.teamb.dfsms.vo.TopChartVO;

@Service
public class TopChartService{

	@Autowired
	private TopChartDao topChartDao;
	
	public List<TopChartVO> topProductList() {
		
		return topChartDao.topProductList();
	}

}
