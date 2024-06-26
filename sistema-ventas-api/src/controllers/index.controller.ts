import { Request, Response } from "express";

class IndexController {

    public index(req: Request, res: Response) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');
            
            return res.json({
                message: "Api Works!"
            });
        } catch (error:any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }

    public insert(req: Request, res: Response) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');
            
            return res.json({
                message: "Insert Works!"
            });
        } catch (error:any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }

    public update(req: Request, res: Response) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');
            
            return res.json({
                message: "Update Works!"
            });
        } catch (error:any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }

    public delete(req: Request, res: Response) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');
            
            return res.json({
                message: "Delete Works!"
            });
        } catch (error:any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }

}

export const indexController = new IndexController();