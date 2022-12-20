import time
from container_functions import run_container, stop_container, delete_container
from multiprocessing import Process

def start_container_cycle(ready):
    if not ready:
        return
    p1 = Process(target=run_container, args=('test_container','test'))
    p1.start()
    p1.join()
    print('run')
    time.sleep(15)
    stop_container('test_container')
    print('stop')
    time.sleep(10)
    delete_container('test_container')
    print('delete')