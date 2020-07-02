import { response, controller, httpGet, httpPost, httpDelete, httpPut, request } from "inversify-express-utils";
import express from "express";
import { TYPES } from '../config/constant/types';
import { inject } from "inversify";
import { ContactRepository } from "../app/repository/contact.repository";
import {  IContactModel } from "../app/model/Contact";

@controller("/api/v1/contact")
export class ContactController {

    private contactRepository: ContactRepository;
    
    constructor(
        @inject(TYPES.ContactRepository) repository: ContactRepository) {
        this.contactRepository = repository;
    }

    @httpGet("/")
    public async get(@request() req: express.Request, @response() res: express.Response) {
        try {
            let output = await new Promise(async (resolve, reject) => {
                this.contactRepository.retrieve().then((data: any) => {
                    resolve(data);
                }).catch(error => {
                    if (error) {
                        reject(error);
                    }
                });
            });
            return res.json(output);
        } catch (error) {
            return res.status(500).send(error.message);
        };
    }
    @httpGet("/search")
        public async search(@request() req: express.Request, @response() res: express.Response) {
            try {
                const pbk = await this.contactRepository.search(req.query.keyword);
                res.json(pbk);
            } catch (error) {
                res.status(500).send(error.message);
            }
        }

    @httpGet("/:id")
    public async getById(@request() req: express.Request, @response() res: express.Response) {
        try {
            const pbk = await this.contactRepository.findById(req.params.id);
            res.json(pbk);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    @httpPost("/")
    public async post(@request() req: express.Request, @response() res: express.Response) {
        try {
            const  data = req.body as IContactModel;
            const pbk = await this.contactRepository.create(data);
            res.json(pbk);
        } catch (error) {
          ///  throw error ;
            res.status(500).send(error.message);
        }
    }

    @httpPut("/:id")
    public async put(@request() req: express.Request, @response() res: express.Response) {
        try {
            const pbk = await this.contactRepository.update(req.params.id, req.body);
            res.json(pbk);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    @httpDelete("/:id")
    public async delete(@request() req: express.Request, @response() res: express.Response) {
        try {
            const pbk = await this.contactRepository.delete(req.params.id);
            res.json(pbk);
        } catch (error) {
            
            res.status(500).send(error.message);
        }
    }
    
    @httpPost("/delete-selected")
    public async deleteSelected(@request() req: express.Request, @response() res: express.Response) {
        try {
            const  data = req.body.ids;
            const pbk = await this.contactRepository.deleteMultiple(data);
            res.json(pbk);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
   
}