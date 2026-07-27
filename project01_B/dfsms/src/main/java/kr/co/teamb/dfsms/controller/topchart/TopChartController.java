package kr.co.teamb.dfsms.controller.topchart;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.teamb.dfsms.service.TopChartService;
import kr.co.teamb.dfsms.vo.TopChartVO;

import org.springframework.web.bind.annotation.RequestParam;


@RequestMapping("/api/topchart")
@RestController
public class TopChartController {
	
	@Autowired
	private TopChartService topChartService;
	
	@GetMapping("/bestitem")
	public List<TopChartVO> topchartlist() {
		return topChartService.topProductList();
	}
	
}
