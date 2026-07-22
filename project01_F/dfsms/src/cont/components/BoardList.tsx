import React from 'react'
import style from '../community/community.module.css'
import { useNavigate } from 'react-router-dom'

interface BoarderListProps {
  title: string,
  column: ColumnInfo[],
  data: Object[],
  foot? : React.ReactNode,
  getClassName? : (...args: any[]) => string,
}

interface ColumnInfo {
  name: string,
  key: string,
  width: number,
  render?: (e: any) => React.ReactNode | null,
}

const BoardList = ({ title, column, data, foot = null, getClassName = () => '' }: BoarderListProps ) => { // 데이터에 따라 컬럼 개수 자동 설정
  return (
    <div className={style.container}>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <br />
      <table className={style.boardTable}>
        <thead>
          <tr>
            {column.map((e: ColumnInfo, idx: number) => (
              <th key={idx} style={{ width: e.width + '%' }}>{e.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            data?.map((e: any, idx: number) => (
              <tr key={idx} className={getClassName(e)}>
                {
                  column.map((col: ColumnInfo, cidx: number) => {
                    if (col.render != null) {
                      return (<td key={cidx} style={{ width: col.width + '%' }}>{col.render(e)}</td>);
                    } else {
                      return (<td key={cidx} style={{ width: col.width + '%' }}>{e[col.key]}</td>);
                    }
                  })
                }
              </tr>
            ))
          }
        </tbody>
        {foot && <tfoot>{foot}</tfoot>}
      </table>
    </div>
  )
}

export default BoardList