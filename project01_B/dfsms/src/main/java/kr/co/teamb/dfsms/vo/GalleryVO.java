package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("GalleryVO")
@Getter
@Setter
public class GalleryVO {
	private int imgid;
	private int productid;
	private String imgnm;
}