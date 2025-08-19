import React, { useEffect, useRef } from "react";
import moment from "moment";
import type { DataSetDataGroup, DataSetDataItem, TimelineOptions, DataGroup } from "vis-timeline";
import { Timeline } from "vis-timeline";
import { DataSet } from "vis-data";
import "./timeline.css"

const idGenerator = (() => {
  let id = 0;
  return () => {
    id++;
    return id;
  };
})();

const VisTimeline: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<Timeline | null>(null);

  const groups: DataSetDataGroup = new DataSet();

  const g_sub_work: DataGroup = {
    id: idGenerator(),
    content: "インターン等副業",
  };
  groups.add(g_sub_work);

  const g_organization: DataGroup = {
    id: idGenerator(),
    content: "所属",
    nestedGroups: [ g_sub_work.id ],
  };
  groups.add(g_organization);

  const g_machine_learning: DataGroup = {
    // Machine Learning / Deep Learning
    id: idGenerator(),
    content: "Data Science",
  };
  groups.add(g_machine_learning);

  const items: DataSetDataItem = new DataSet();
  items.add(
        (() => {
          const gid = g_organization.id;
          const startMoment = moment("2013-04-01");
          const endMoment = moment("2016-03-30");
          return [
              {
              id: idGenerator(),
              group: gid,
              content: ``,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "background",
            },
            {
              id: idGenerator(),
              group: gid,
              content: `
                <div>
                高等学校 (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>地方の普通科進学校
                </div>
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "range",
            },
          ];
        }
      )(),
  );
  items.add(
      (
        () => {
          const gid = g_organization.id;
          const startMoment = moment("2016-04-01");
          const endMoment = moment("2021-03-30");
          return [{
            id: idGenerator(),
            group: gid,
            content: ``,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "background",
          },
          {
            id: idGenerator(),
            group: gid,
            content: `
              <div>
                <a href="https://scrapbox.io/pollenJP-Portfolio/上智大学大学院_理工学専攻_情報学領域_(山中研究室)">上智大学</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>理工学部 情報理工学科
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "range",
          }
        ]
        }
      )(),
  );
  items.add(
    [
      (
        () => {
          const startMoment = moment("2017-11-01");
          const endMoment = moment("2018-08-31");
          return {
            id: idGenerator(),
            group: g_sub_work.id,
            content: `
              <div>
                <a href="https://scrapbox.io/pollenJP-Portfolio/株式会社カブク_kabuku">株式会社Kabukuインターン</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>職種：機械学習エンジニア
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "range",
          }
        }
      )(),
      (
        () => {
          const startMoment = moment("2018-09-01");
          const endMoment = moment("2021-11-30");
          return {
            id: idGenerator(),
            group: g_sub_work.id,
            content: `
              <div>
                ギリア株式会社インターン (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>職種：機械学習エンジニア
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "range",
          }
        }
      )(),
      (
        () => {
          const startMoment = moment("2019-05-01");
          const endMoment = moment("2020-04-01");
          return {
            id: idGenerator(),
            group: g_organization.id,
            content: `
              <div>
                休学・休職 / 復学 (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>身内の病気の都合で実家に帰省
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "range",
          }
        }
      )(),
      (
        () => {
          const startMoment = moment("2021-04-01");
          const endMoment = moment("2023-03-31");
          return {
            id: idGenerator(),
            group: g_organization.id,
            content: `
              <div>
                <a href="https://scrapbox.io/pollenJP-Portfolio/上智大学大学院_理工学専攻_情報学領域_(山中研究室)">上智大学大学院</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>理工学専攻 情報学領域 山中研究室
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "background",
          }
        }
      )(),
      (
        () => {
          const startMoment = moment("2021-12-27");
          const endMoment = moment("2022-01-07");
          return {
            id: idGenerator(),
            group: g_sub_work.id,
            content: `
              <div>
                <a href="https://scrapbox.io/pollenJP-Portfolio/KLab_Server_Side_Camp_%231">KLab株式会社短期インターン</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>コース：Server Side Camp #1
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "box",
          }
        }
      )(),
      (
        () => {
          const startMoment = moment("2022-03-03");
          const endMoment = moment("2022-03-09");
          return {
            id: idGenerator(),
            group: g_sub_work.id,
            content: `
              <div>
                <a href="https://scrapbox.io/pollenJP-Portfolio/KLab_Expert_Camp_%235">KLab株式会社短期インターン</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>コース：Expert Camp #5 (発展コース mikanos-net の再現実装)
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "box",
          }
        }
      )(),
      (
        () => {
          const startMoment = moment("2023-04-04");
          const endMoment = moment("2025-06-30");
          return {
            id: idGenerator(),
            group: g_organization.id,
            content: `
              <div>
                <a href="https://scrapbox.io/pollenJP-Portfolio/KLab株式会社">KLab株式会社 所属</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>職種：SRE
                <br>内容：サービス運用・開発インフラ整備・ログ監視ツール作成
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "background",
          }
        }
      )(),
    ]
  );

  const options: TimelineOptions = (() => {
    const endMoment = moment();
    const startMoment = endMoment.clone().subtract(5, "year");
    return {
      start: startMoment.toDate(),
      end: endMoment.toDate(),
      horizontalScroll: true,
      horizontalScrollKey: "shiftKey",
      zoomKey: "ctrlKey",
      orientation: "both",
    };
  })();

  const initTimeline = () => {
    if (containerRef.current === null) {
      console.log("containerRef.current is null");
      return;
    }

    timelineRef.current = new Timeline(containerRef.current, items, groups, options);
    console.log("updated!");
  };

	useEffect(() => {
    if (containerRef.current !== null) {
      initTimeline();
    }
	}, [containerRef, timelineRef]);

	return <div
    ref={containerRef}
    style={{
      boxSizing: "border-box",
      width: "100%",
      border: "1px solid lightgray",
    }}
  >
    <div></div>
  </div>;
};

export default VisTimeline;
