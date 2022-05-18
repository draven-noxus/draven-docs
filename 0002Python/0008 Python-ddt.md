# Python测试教程18年

```python
import unittest
import ddt


@ddt.ddt
class Test_ddt(unittest.TestCase):
    user = [["u1", "p1"], ["u2", "p3"]]

    @ddt.unpack
    @ddt.data(*user)
    def test_login(self, username, password):
        if 'u1' == username:
            print(username)
            print(password)
        elif 'u2' == username:
            print(username)
            print(password)
        else:
            print("others")


'''if __name__ == '__main__':
    # 默认执行全部的测试方法
    unittest.main()'''

```















