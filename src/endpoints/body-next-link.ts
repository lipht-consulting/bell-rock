import { Request, Response } from 'express';
import { generateRandomArrayOfData } from '../helpers/generate-random-array-of-data';
// import { config, genRandomArrayOfData, logger, rollbar } from './index';
import { logger } from '../helpers/logger';

const maxTotalSize = 1e6;
const maxPageSize = 1000;

export function bodyNextLink(req: Request, res: Response) {
    const totalElements: number = req.query.totalElements
        ? Number(req.query.totalElements)
        : 4000;
    const page: number = req.query.page ? Number(req.query.page) : 0;
    const pageSize: number = req.query.pageSize ? Number(req.query.pageSize) : 20;
    if (totalElements > maxTotalSize) {
        res.status(400).send(`Error, max total elements is ${maxTotalSize}`);
        return;
    }
    if (pageSize > maxPageSize) {
        res.status(400).send(`Error, max page size is ${maxPageSize}`);
        return;
    }
    if (page * pageSize > totalElements) {
        const lastPage = Math.ceil(totalElements / pageSize);
        res.status(400).send(`Error, you execced max page. ( last page is ${lastPage})`);
        return;
    }
    let done: boolean = false;
    const pageStart = page * pageSize;
    let pageEnd = pageStart + pageSize;
    if (pageEnd > totalElements) {
        pageEnd = totalElements;
        done = true;
    }
    const pageLength = pageEnd - pageStart;
    logger.debug(`pagination is now done. Return data from pageStart: ${pageStart} to pageEnd: ${pageEnd}. That is an
    array og length ${pageSize}`);
    const returnData: ReturnData = {
        collection: generateRandomArrayOfData(pageSize),
        pagination: {
            maxPageSizeAllowed: maxPageSize,
            pageSize,
            results: totalElements,
        },
    };
    if (done === false) {
        returnData.pagination.nextPage = `/bodyNextLinkNoPrimaryKey?&page=${page +
            1}&pageSize=${pageSize}`;
    }
    res.status(200).json(returnData);
}

declare interface ReturnData {
    collection: any[];
    pagination: {
        maxPageSizeAllowed: number;
        pageSize: number;
        results: number;
        nextPage?: string | number;
    };
}
