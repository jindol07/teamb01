package kr.co.teamb.dfsms.service;

import java.time.Year;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.teamb.dfsms.dao.ChartDao;
import kr.co.teamb.dfsms.vo.ChartVO;

@Service
public class ChartService {
	@Autowired
	private ChartDao chartDao;

	public List<ChartVO> bestItemList() {
		return chartDao.bestItemList();
	}

	public List<ChartVO> ctgyGroupList(Map<String, String> map) {
		String birthStr = map.get("birth");
		int birth = Integer.parseInt(birthStr.substring(0, 4));
		int currentYear = Year.now().getValue();
		int age = currentYear - birth;

		int birthStart;
		int birthEnd;
		// 40대 이상
		if (age >= 40) {
			birthStart = 1900; // 최소년도
			birthEnd = currentYear - 40;
		} else {
			int ageGroup = (age / 10) * 10;
			birthStart = currentYear - (ageGroup + 9);
			birthEnd = currentYear - ageGroup;
		}
		map.put("syear", String.valueOf(birthStart));
		map.put("eyear", String.valueOf(birthEnd));

		return chartDao.ctgyGroupList(map);

	}

	public List<ChartVO> getRecommendProducts(int categoryid) {
		return chartDao.getRecommendProducts(categoryid);
	}
}
