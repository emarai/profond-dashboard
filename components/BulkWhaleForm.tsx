// @ts-nocheck
import { Button } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import UploadBox from './UploadBox'
import parasWhale from '../config/paras_whale.json'
import mintbaseWhale from '../config/mintbase_whale.json'
import fewandfarWhale from '../config/fewandfar_whale.json'

export default function BulkWhaleForm({ setWalletHandler }) {
    return (
        <Content>
            <div className="bg-white m-5 p-6 h-full text-center">
                <div className="mt-2 mx-auto max-w-lg">
                    <h1 className="text-lg mb-1">Explore by Marketplace</h1>
                    <div>
                        <div>
                            <Button onClick={() => {setWalletHandler(parasWhale)}} className="w-1/2 mb-1">Paras</Button>
                        </div>
                        <div>
                            <Button onClick={() => {setWalletHandler(mintbaseWhale)}} className="w-1/2 mb-1">Mintbase</Button>
                        </div>
                        <div>
                            <Button onClick={() => {setWalletHandler(fewandfarWhale)}} className="w-1/2 mb-1">Few & Far</Button>
                        </div>
                        <br />
                        <p>
                            * Only shows the latest 100 transactions of each
                            wallet
                        </p>
                    </div>
                    <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <h1 className="text-lg mb-1">Explore by Input</h1>
                    <div>
                        <UploadBox setWalletHandler={setWalletHandler}/>
                        <br />
                        <p>
                            * Download CSV sample <a href="/paras_whale.csv"><b>here</b></a>
                        </p>
                        <p>
                            *** Only shows the latest 100 transactions of each
                            wallet
                        </p>
                    </div>
                </div>
            </div>
        </Content>
    )
}
