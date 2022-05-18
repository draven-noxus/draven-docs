# Git

���ϣ�https://www.liaoxuefeng.com/wiki/896043488029600/896067074338496



## linux

```shell
# ����
https://git-scm.com/downloads
# λ��
Older releases are available and the Git source repository is on GitHub. 
# ��ȡ��װ��
https://github.com/git/git/releases
# ��װ�ĵ�
https://git-scm.com/book/zh/v2/�������ϵ�-Git-�ڷ������ϴ-Git

# ��ѹ
# error  /bin/sh: cc: command not found
sudo yum -y install gcc gcc-c++ libstdc++-devel

# error git-compat-util.h:297:25: fatal error: openssl/ssl.h: No such file or directory
# Centos7 ��װ�߰汾git������ʱ�Ҳ����Ҳ���openssl/ssl.h�ļ�
��� ��yum install openssl-devel
# �˲��費֪�Ƿ���Ч��yum install curl-devel expat-devel gettext-devel
```

## Git ��������

?		��ǰĿ¼������ļ��У�mkdir �ļ�����
--�ڵ�ǰ��Ŀ¼�����һ���ļ��У��������һ��kang�ļ��У�
���磺mkdir kang

```shell
vim�༭��
����ļ������������vim  �ļ���				
--�ڵ�ǰĿ¼�����һ���ļ������в������������һ��kang.txt��
(ע����Ϊgithub��Linux֮��д�����������Linux����һ��)	
	���磺vim kang.txt
	����뵽һ���������棬
	�������˳��Ļ��Ȱ�Esc��:wq
	��wq�Ǳ����˳�����˼
```



```shell
	�鿴��ǰ״̬��git status 				
	--�鿴��ǰ�Ŀ�������û�н��в������紴�����޸�
	������
	��ɫ��Ϊ�ڹ������ڵĲ�����
	add��ӵ��ݴ������Ϊ��ɫ��
	������commit�ύ
```



```shell
	ɾ���ļ���git rm �ļ���					
	--ɾ���ĵ�ǰĿ¼�µ��ļ�������ɾ��kang.txt��
	���磺
	git rm kang.txt
```



```
	������ӣ�git add �ļ���				
	--��������ļ����д������޸�֮����Ҫ������ӵ��ݴ���
	������ӣ�git add .						
	���磺
	git add kang.txt ���һ��kang.txt���ݴ���
	git add .  	 �����������й��Ķ����ļ�
```



```
	1�������ύ��git commit -m "�ύ��Ϣ" �ļ���		
	--�����ύ����ǰgit��Դ�汾�⣬Ȼ����ܽ���Զ�̴���
	2������ύ��git commit -m "�ύ��Ϣ"			
	������
	���ύ֮��δ�԰汾����в�������Զ�̽��򲻻���ʾ�Ķ���������������Ķ�
    �ύһ��this.java
		1)git commit -m "add this.java" this.java
		2)git commit -m "add *"		�������ݴ����ķ������Ķ����ļ�
```

```
	�����ύ��git rm --cached �ļ���			������һ�����ύ�����ݴ����ļ��Żع�����
```

```
	git branch -a �鿴���еķ�֧				--��ʾ��ǰ�汾��ͱ��ص����з�֧
```



```
	git branch -r �鿴�������з�֧				--��ʾ��ǰ�ı��ط�֧
```



```
	git commit -am "ע��" 					--�ύ���Ҽ�ע�� 

	git remote add origin git@192.168.1.119:ndshow

	git push origin master ���ļ����Ƶ��������� 

	git remote show origin ��ʾԶ�̿�origin�����Դ 

	git push origin master:develop

	git push origin master:hb-dev �����ؿ���������ϵĿ���й��� 

	git checkout --track origin/dev �л���Զ��dev��֧

	git branch -D master rm develop ɾ�����ؿ�develop

	git checkout -b ��֧����							-- ����һ���µı��ط�֧�����罨��һ����֧kang��

											git checkout -b kang

	git merge origin/dev ����֧dev�뵱ǰ��֧���кϲ�
```

```
	git remote show �鿴Զ�̿�
```

1��Զ�ֿ̲��������

```
�����Ҳ�Ƹ��ƣ��ֿ⣺git clone ��github��Զ�ֿ̲��ַ����https://github.com/YellowKang/HelloWord.git��

		���磺git clone https://github.com/YellowKang/HelloWord.git(ע���������ڵ�ǰĿ¼�£�����ѡ������·���磺F:/ĳĳ/ĳĳ/����)

�鿴Զ�ֿ̲⣺git remote -v
	
		�鿴���ύ����Զ�ֿ̲��ַ��ַ����
					origin  https://github.com/YellowKang/MyWork (fetch)
					origin  https://github.com/YellowKang/MyWork (push)
```

```
���Զ�ֿ̲⣺git remote add [name] [url]
```



```
ɾ��Զ�ֿ̲⣺git remote rm [name]
```



```
�޸�Զ�ֿ̲⣺git remote set-url --push [name] [newUrl]
```



```
��ȡ��Ҳ�Ƹ���Զ�ֿ̲����Դ��Զ�ֿ̲⣺git pull [�����ַ�磺https://github.com/YellowKang/HelloWord.git �������ñ���] [��ǰʹ�õ�֧��������master]

���£�git pull https://github.com/YellowKang/HelloWord.git master
```



```
	����Զ�ֿ̲⣺git push [�����ַ�磺https://github.com/YellowKang/HelloWord.git �������ñ���] [��ǰʹ�õ�֧��������master]

���£�git push https://github.com/YellowKang/HelloWord.git master
	ע��������ͷ�֧��Զ�ֿ̲�
	���磺
	�ύ���ص�kang��֧����Զ�̵�master��֧����https://github.com/YellowKang/MyWork.git��
	git push https://github.com/YellowKang/MyWork.git  kang:master
```



2����֧(branch)�����������

```
�鿴���ط�֧��git branch				--��ʾ��ǰ������з�֧
     ���磺
		$ git branch
		* master(����master��֧)ע��masterΪĬ�ϴ�����֧
		* kang(����kang��֧)
```

?		

```
�鿴Զ�̷�֧��git branch -r				--��ʾ�ύ����Զ�̵�ַ���еķ�֧
	���磺$ git branch -r						
```



origin/HEAD -> origin/master
 	origin/master									

```
�������ط�֧��git branch ��֧�� 			--ע���·�֧�����󲻻��Զ��л�Ϊ��ǰ��֧
�����·�֧�������л����·�֧��git checkout -b ��֧��	--ע�ⴴ���·�֧�������л����·�֧
	���磺
	/f/git/hellos/mywork (master)
	����һ��kang��֧����
	/f/git/hellos/mywork (kang)
```



```
�л���֧��git checkout ��֧��				--�л���֧���ã���������֧û�в���Ӱ��
	���磺
	/f/git/hellos/mywork (master)
	����
	/f/git/hellos/mywork (kang)
```



```
ɾ����֧��git branch -d ��֧��				--ɾ��һ����֧������δ�кϲ��ķ�֧���޷�ɾ���ġ�
		�����ǿ��ɾ��һ����֧������ʹ��-Dѡ��
		���磺
		git branch -D kang
```



```
�ϲ���֧��git merge ��֧�� 				--����֧�뵱ǰ��֧�ϲ���ע���ϲ�֮�󲻻�ɾ��ԭ�з�֧����Ҫ�ֶ�ɾ����
		���磺
		��ǰѡ��master��֧f/git/hellos/mywork (master)
		git merge kang
```

 

```
�޸ķ�֧���ƣ�git branch -m �޸ĺ�ķ�֧��		--����ǰѡ�еķ�֧�����Ƹı�
		���磺
		ԭ��֧Ϊ��/f/git/hello (kang)
		git branch -m kangs
		�޸ĺ�Ϊ��/f/git/hello (kangs)
```

3���汾(tag)�����������
	��ǰ汾�ţ�git tag �汾��				--��ǵ�ǰ��Ŀ�İ汾���
								���磺
									git tag v0.0.1
									��ʹ��git tag �鿴��ǰ�汾��

```
�鿴�汾��git tag					--��ʾ��ǹ��İ汾�ţ���ע��δ��ǰ汾������ʾ�κ����

```



```
ɾ���汾��git tag -d �汾��				--ɾ������İ汾�ţ���ע�������汾�ź󲻻��滻ԭ���İ汾�ţ�����ԭ�������һ��������ɾ��Ҳ���Բ�ɾ����
		���磺
		$ git tag -d v0.0.2
		Deleted tag 'v0.0.2' (was 5a4c6b0)
		(��ɾ���ɹ�)
```



```
����Զ�̰汾(���ذ汾push��Զ��)�� git push origin [name]
```

ɾ��Զ�̰汾��$ git push origin :refs/tags/[name]

�ϲ�Զ�ֿ̲��tag�����أ�$ git pull origin --tags

�ϴ�����tag��Զ�ֿ̲⣺$ git push origin --tags

������ע�͵�tag�� git tag -a [name] -m 'yourMessage'



4) ��ģ��(submodule)��ز�������

�����ģ�飺$ git submodule add [url] [path]

   �磺$git submodule add git://github.com/soberh/ui-libs.git src/main/webapp/ui-libs

��ʼ����ģ�飺$ git submodule init  ----ֻ���״μ���ֿ�ʱ����һ�ξ���

������ģ�飺$ git submodule update ----ÿ�θ��»��л���֧����Ҫ����һ��

ɾ����ģ�飺����4����Ŷ��

 1) $ git rm --cached [path]

 2) �༭��.gitmodules���ļ�������ģ���������ýڵ�ɾ����

 3) �༭�� .git/config���ļ�������ģ���������ýڵ�ɾ����

 4) �ֶ�ɾ����ģ�������Ŀ¼

 

5������һЩ�ļ����ļ��в��ύ

�ڲֿ��Ŀ¼�´�������Ϊ��.gitignore�����ļ���д�벻��Ҫ���ļ��������ļ���ÿ��Ԫ��ռһ�м��ɣ���

target

bin

*.db



=====================	

--��ӵ�ǰ���еĲ����������ļ����ļ��е��޸ĺͲ���

git rm �ļ���(����·��) ��git��ɾ��ָ���ļ�
git clone git://github.com/schacon/grit.git �ӷ������Ͻ������������
git config --list �������û�
git ls-files ���Ѿ����ύ��
git rm [file name] ɾ��һ���ļ�
git commit -a �ύ��ǰrepos�����еĸı�
git add [file name] ���һ���ļ���git index
git commit -v �����ã�v������ʱ����Կ�commit�Ĳ���
git commit -m "This is the message describing the commit" ���commit��Ϣ
git commit -a -a�Ǵ���add�������е�change�ӵ�git index��Ȼ����commit
git commit -a -v һ���ύ����
git log ����commit����־
git diff �鿴��δ�ݴ�ĸ���
git rm a.a �Ƴ��ļ�(���ݴ����͹�������ɾ��)
git rm --cached a.a �Ƴ��ļ�(ֻ���ݴ�����ɾ��)
git commit -m "remove" �Ƴ��ļ�(��Git��ɾ��)
git rm -f a.a ǿ���Ƴ��޸ĺ��ļ�(���ݴ����͹�������ɾ��)
git diff --cached �� $ git diff --staged �鿴��δ�ύ�ĸ���
git stash push ���ļ���push��һ����ʱ�ռ���

git stash pop ���ļ�����ʱ�ռ�pop����

git remote add origin git@github.com:username/Hello-World.git

git push origin master ��������Ŀ���ύ����������

git pull �������������ͬ��

git push (Զ�ֿ̲���) (��֧��) �����ط�֧���͵���������ȥ��

git push origin serverfix:awesomebranch

git fetch �൱���Ǵ�Զ�̻�ȡ���°汾�����أ������Զ�merge
git branch branch_0.1 master ������֧master����branch_0.1��֧
git branch -m branch_0.1 branch_1.0 ��branch_0.1������Ϊbranch_1.0
git checkout branch_1.0/master �л���branch_1.0/master��֧
du -hs

------












