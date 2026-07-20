import React from 'react'
import style from '../community/community.module.css'
import { useNavigate } from 'react-router-dom'

interface ColumnInfo {
  name: string,
  key: string,
  width: number,
  render?: (e: any) => React.ReactNode | null,
}

const BoardList = ({ title, column, data, getClassName, foot }: {
  title: string, column: ColumnInfo[], data: Object[],
  getClassName?: (...args: any[]) => string, foot: React.ReactNode
}) => { // 데이터에 따라 컬럼 개수 자동 설정
  return (
    <div className={style.container}>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <br />
      <table className={style.boardTable}>
        <thead>
          <tr>
            {column.map((e: ColumnInfo, idx: number) => (
              <th key={idx} style={{ width: e.width }}>{e.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            data?.map((e: any, idx: number) => (
              <tr key={idx} className={getClassName && getClassName(e)}>
                {
                  column.map((col: ColumnInfo, cidx: number) => {
                    if (col.render != null) {
                      return (col.render(e));
                    } else {
                      return (<td key={cidx}>{e[col.key]}</td>);
                    }
                  })
                }
              </tr>
            ))
          }
        </tbody>
        <tfoot>{foot}</tfoot>
      </table>
    </div>
  )
}

export default BoardList