package kr.co.teamb.dfsms.controller.products;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.teamb.dfsms.cmn.PagingService;
import kr.co.teamb.dfsms.service.ProductsService;
import kr.co.teamb.dfsms.vo.GalleryVO;
import kr.co.teamb.dfsms.vo.PageVO;
import kr.co.teamb.dfsms.vo.ProductsVO;

@RestController
@RequestMapping("/products")
public class ProductsController {
	@Autowired
	private ProductsService productService;
	
	@Autowired
	private PagingService pagingService;

	@Value("${spring.servlet.multipart.location}")
	private String filePath;
	
//	1. 전체 상품 리스트

//	@RequestMapping("/list")

//	public List<ProductsVO> selectProductList(Map<String, String> map) {

//		return productService.selectProductList(map);

//	}

	
	@RequestMapping("/list")
	public Map<String, Object> selectProductList(@RequestParam Map<String, String> paramMap, HttpServletRequest request) {
//		현재 페이지에 따라 페이지 공식에 의해서 begin과 end를 구해서 페이징처리되어서 반환받은 데이터

		String cPage = paramMap.get("cPage");

		int totalCount = productService.totalCount(paramMap); // 원래 비어있었는데 paramMap를 받음


		PageVO pageVO = pagingService.makePage(totalCount, cPage);

		Map<String, String> map = new HashMap<>(paramMap);
		map.put("begin", String.valueOf(pageVO.getBeginPerPage()));
		map.put("end", String.valueOf(pageVO.getEndPerPage()));

		List<ProductsVO> list = productService.selectProductList(map);

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
	
//	2. 상품 상세 조회

	@GetMapping("/detail")
	public ProductsVO selectProductDetail(@RequestParam("productid") int productid) {
		return productService.selectProductDetail(productid);
	}

	@PostMapping("/add")
	public ResponseEntity<?> addProducts(ProductsVO pvo, @RequestParam("images") MultipartFile[] images,
			HttpServletRequest request) {
		// 이미지들을 저장해서 MyBatis로 보내기 위해서 생성

		List<GalleryVO> imageList = new ArrayList<>();

		for (MultipartFile file : images) {
			if (!file.isEmpty()) {
				String originalFilename = file.getOriginalFilename();
				File f = new File(filePath + "/gallery/", originalFilename);
				try {
					file.transferTo(f);// 업로드 완료

					GalleryVO imageVO = new GalleryVO();// 이미지 객체 생성

					imageVO.setImgnm(originalFilename); // 이미지명 vo에 저장

					imageList.add(imageVO); // 책꽃이에 저장

				} catch (IllegalStateException | IOException e) {
					e.printStackTrace();
				}
			}
		}
		// pvo에 이미지 리스트 설정

		pvo.setGalleryList(imageList);

		// 이력 등록(작업중)

		// service에 등록

		try {
			productService.transcationProcess(pvo, imageList);
			System.out.println("add product with img transaction process success!!!");
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Rollback...");
		}
		return ResponseEntity.ok("product insert success!!");
	}
	
	@GetMapping("/delete")
	public String delProducts(@RequestParam("num") int num) {
			productService.delProducts(num);
		return "삭제 완료";
	}

	@PostMapping("/update")
	public ResponseEntity<?> Productupdate(ProductsVO vo,HttpServletRequest req) {
		productService.Productupdate(vo);
		
		return ResponseEntity.ok().body("업데이트 성공!");
	}
	
}