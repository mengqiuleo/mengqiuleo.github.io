import { format } from 'date-fns'

import { de, en } from './secret'
import { mdToHtml } from './postTools.js'

const { hash } = window.config

window.encrypt = en // en加密方法，de解密方法

function toQuery(raw) {
  const params = new URLSearchParams();

  Object.keys(raw).forEach((key) => {
    if (raw[key]) params.append(key, String(raw[key]));
  });

  return `?${params.toString()}`;
}

function hasBody(method) {
  return ['POST', 'PUT', 'PATCH'].includes(method);
}

class Github {
  constructor() {
    // console.log(de(hash))
    this.apiBase = 'https://api.github.com';
    // this.token = [ import.meta.env.VITE_GITHUB_ACCESS_TOKEN_PART1 ] // 需拆开
    this.token = [ de(hash) ];
    this.owner = 'mengqiuleo';
    this.repo = 'mengqiuleo.github.io';
  }

  async request(method, url, data) {
    let query = '';
    let body = data;

    if (data && !hasBody(method)) {
      query = toQuery(data);
      body = undefined;
    }

    let requestUrl =  `https://api.github.com/repos/${this.owner}/${this.repo}/issues`
    // 添加参数
    requestUrl += `?creator=${this.owner}&per_page=1000&access_token=${this.token.join('')}`;


    let href = `https://github.com/${this.owner}/${this.repo}/issues`;

    try {
      const response = await fetch([this.apiBase, url, query].join(''), {
        method,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${this.token.join('')}`, //我们暂时不加 token（当博客数量超过30时再处理）
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      return response.json();
    } catch(e) {
      console.log('调取issues接口出错', e)
      window.location.assign(href)
    }
    

    // return fetch(requestUrl)
    //   .then(response => response.json())
    //   .catch(e => {
    //     window.location.href = href
    //   })
    
  }

  async listIssues(options) {
    // const { milestone, labels, state, sort, direction, page, pageSize } = options;

    // const query = {
    //   milestone,
    //   labels,
    //   state,
    //   sort,
    //   direction,
    //   page,
    //   per_page: pageSize,
    //   creator: this.owner,
    // };
    // return this.request('GET', `/repos/${this.owner}/${this.repo}/issues`, query);

    //* 暂时请求所有数据，不做分页处理
    const originData =  await this.request('GET', `/repos/${this.owner}/${this.repo}/issues`);
    const res = Array.from(originData).map(item => {
      const date = new Date(item.created_at);
      item['date'] = format(date, 'yyyy-MM-dd');
      return item
    });
  
    return res
  }

  getIssue(issue) {
    return this.request('GET', `/repos/${this.owner}/${this.repo}/issues/${issue}`);
  }

}

// export default new Github(
//   import.meta.env.VITE_GITHUB_ACCESS_TOKEN_PART1 + import.meta.env.VITE_GITHUB_ACCESS_TOKEN_PART2,
//   import.meta.env.VITE_GITHUB_OWNER,
//   import.meta.env.VITE_GITHUB_REPO,
// );
export default new Github();
