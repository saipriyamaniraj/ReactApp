import { Controller, Get, Response, Request, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { DbService } from './db.service';
import { ApiTags } from '@nestjs/swagger';
import { Utility } from '../common/utility';
import { ResMessage } from '../common/res.message';
import { DbConfigDetails, PagingFilter } from 'src/common/dto/db.dto';
import * as config from 'config';
import { Constants } from 'src/common/constants';

@Controller('dbdetails')
export class DbController {
    constructor(
        private readonly dbService: DbService,
        private readonly Utility: Utility){ }

    //Get all database configuration details
    @Post('get')
    public async getDbDetails(@Response() res, @Request() req, @Body() pagingFilter :PagingFilter) {
        const { getDbDetails } = this.dbService;
        const { sendSuccess, sendError} = this.Utility;
        try {
            const result = await getDbDetails(pagingFilter);
            return sendSuccess(req, res, result, ResMessage.SUCCESS);
        } catch (e) {
            return sendError(req, res, e);
        }
    }

    //Insert database configuration details
    @Post('insert')
    public async postDbDetails(@Response() res, @Request() req, @Body() dbConfigDetails: DbConfigDetails) {
        const { postDbDetails } = this.dbService;
        const { sendSuccess, sendError} = this.Utility;
        try {
            const result = await postDbDetails(dbConfigDetails)
            return sendSuccess(req, res, result, ResMessage.SUCCESS);
        } catch (e) {
            return sendError(req, res, e);
        }
    }

    //Update database confiuration details
    @Put('update/:_id')
    public async putDbDetails(@Response() res, @Request() req, @Param('_id') _id: string, @Body() dbConfigDetails: DbConfigDetails) {
        const { putDbDetails } = this.dbService;
        const { sendSuccess, sendError} = this.Utility;
        try {
            const result = await putDbDetails(_id, dbConfigDetails);
            return sendSuccess(req, res, result, ResMessage.SUCCESS);
        } catch (e) {
            return sendError(req, res, e);
        }
    }

    //Delete database configuration details
    @Delete('delete/:_id')
    public async deleteDbDetails(@Response() res, @Request() req, @Param('_id') _id: string) {
        const { deleteDbDetails } = this.dbService;
        const { sendSuccess, sendError} = this.Utility;
        try {
            const result = await deleteDbDetails(_id);
            return sendSuccess(req, res, result, ResMessage.SUCCESS);
        } catch (e) {
            return sendError(req, res, e);
        }
    }

    //Download database configuration details
    @Get('download')
    public async downloadDbDetails(@Response() res, @Request() req) {
        const { sendSuccess, sendError} = this.Utility;
        try {
            const {contentType, contentDisposition} = config.excelDownloadConfig;
            const workbook = await this.dbService.downloadDbDetails();
            res.setHeader('Content-Type', contentType);
            res.setHeader("Content-Disposition", contentDisposition + Constants.EXCEL_FILE_NAME);
            workbook.xlsx.write(res);
            return workbook;
        } catch (e) {
            return sendError(req, res, e);
        }
    }

    //Get database configuration details for the given id
    @Get('get/:_id')
    public async getDbDetailsById(@Response() res, @Request() req, @Param('_id') _id: string){
        const { getDbDetailsById } = this.dbService;
        const { sendSuccess, sendError} = this.Utility;
        try {
            const result = await getDbDetailsById(_id);
            return sendSuccess(req, res, result, ResMessage.SUCCESS);
        } catch (e) {
            return sendError(req, res, e);
        }
    }

    //Get all the database configuration details
    @Get('all')
    public async getAllDBDetailsList(@Request() request, @Response() response){
      const { getAllDBDetailsList } = this.dbService;
      const { sendSuccess, sendError } = this.Utility;
      try {
        const result = await getAllDBDetailsList();
        return sendSuccess(request, response, result, ResMessage.SUCCESS);
      } catch (e) {
        return sendError(request, response, e);
      }
    }
}
