const express = require('express');
const db = require(__dirname + '/__connect_db'); //__dirname當前資料夾
const router = express.Router(); // express.Router()有點類似資料夾

router.get('/list/:page?', (req, res) => { //注意 :page? 
    res.locals.title = 'python爬蟲寫進MySQL';
    res.locals.pageName = 'urlinmysql';
    const perPage = 5;
    let totalRows = 0;
    let totalPages = 0;
    let page = req.params.page ? parseInt(req.params.page) : 1;

    const t_sql = "SELECT COUNT(1) num FROM pttweb_url";//等於"SELECT COUNT(1) AS num FROM pttweb_url"讓COUNT(1)變成num
    db.query(t_sql, (error, results) => {
        totalRows = results[0].num; // 總筆數

        // TODO: 要排除沒資料的狀況
        totalPages = Math.ceil(totalRows / perPage);  // 總頁數
        if (page < 1) {
            res.redirect('/urlinmysql/list/1');
            //叫瀏覽器再傳一次request('/address-book/list/1')
            return;
        }
        if (page > totalPages) {
            res.redirect('/urlinmysql/list/' + totalPages);
            return;
        }
        const sql = `SELECT * FROM pttweb_url ORDER BY sid DESC LIMIT ${(page - 1) * perPage}, ${perPage}`;

        db.query(sql, (error, results) => {
            // const fm = 'YYYY-MM-DD';
            // results.forEach(function (el) {
            //     el.birthday = moment(el.posttime).format(fm);
            //     // el.birthday = moment(el.birthday).tz('Europe/London').format('YYYY-MM-DD HH:mm:ss');
            // });
            const output = {
                perPage: perPage,
                page,
                totalRows,
                totalPages,
                rows: results
            }
            // console.log(output);

            res.render('pyurlinmysql/list', output);

            // res.json({
            //     perPage,
            //     page,
            //     totalRows,
            //     totalPages,
            //     rows: results
            // });
        });
    });
})


module.exports = router;