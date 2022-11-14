# `Contributor guide`

# Chilli-Source**에 기여**

이 문서는 도움을 구하거나 버그를 보고하거나 프로젝트에 기여하려는 분들을 위한 문서입니다.

다양한 분야에서 재능을 가지신분들의 멋진 참여를 기대합니다 가이드를 참고 해주세요

## 시작하기전

Chilli-Source에 관한 모든 작업은 GitLab을 통해 소통 합니다.

시작하기 전에 커뮤니티 규정인 [행동강령](./ContributorCovenant.md)을 확인 후 지켜주세요

우리는 Bug에 대해 GitLab Issue를 사용하고 있습니다.

새 Bug를 이야기 하기전 이미 논의되고 있는 Bug는 아닌지 확인해주세요

## 개발 가이드

### 버전 정보

Chilli-Source는 원할한 개발을 위해 개발환경의 통일성을 준수합니다.

아래와 같은 개발 환경 준수를 부탁드립니다.



## 기술 스택
<div align=left>
<table>
    <tr>
        <td><b>Back-end</b></td>
        <td>
        <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=Java&logoColor=white">
        <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
        <img src="https://img.shields.io/badge/spring cloud-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
        <img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
        <img src="https://img.shields.io/badge/apache tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=black">
        <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black">
        <img src="https://img.shields.io/badge/hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white">
</td>
    </tr>
    <tr>
    <td><b>Front-end</b></td>
    <td>
        <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
        <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
        <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
        <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
        <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
        <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
        <img src="https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
        <img src="https://img.shields.io/badge/recoil-0075EB?style=for-the-badge&logo=recoil&logoColor=white">
    </td>
    </tr>
    <tr>
        <td><b>Infra</b></td>
    <td>
        <img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black">
        <img src="https://img.shields.io/badge/amazon aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
        <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
        <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
        <img src="https://img.shields.io/badge/zipkin-FC6D20?style=for-the-badge&logo=zipkin&logoColor=white">
        <img src="https://img.shields.io/badge/prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white">
        <img src="https://img.shields.io/badge/grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white">
        <img src="https://img.shields.io/badge/elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white">
        <img src="https://img.shields.io/badge/logstash-005571?style=for-the-badge&logo=logstash&logoColor=white">
        <img src="https://img.shields.io/badge/kibana-005571?style=for-the-badge&logo=kibana&logoColor=white">
        <img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
        <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
        <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
        <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
        <img src="https://img.shields.io/badge/rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white">
    </td>
    </tr>
    <tr>
            <td><b>Team Collaboration Tool</b></td>
    <td>
        <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">
        <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">
        <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
        <img src="https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white">
        <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
    </td>
    </tr>
    <tr>
</table>
</div>




## 시작하기 

Chilli-Source는 코드의 통일성 및 원활한 가독성, 유지보수등의 이유로

Java, TypeScript , DataBase ,Git 에서 `스타일 가이드`를 제공합니다.

- Java, TypeScript , DB의 Style Guide 및 이 이 [문서](./CodeStyleGuide.md)에서 확인 해주세요
- Git과 관련된 `brach`, `commit`, `merge` 등의 규칙은 이 [문서](./GitConvention.md)에서 확인 해주세요



## Issues를 **보고하려면?**

[Git Issue]자유롭게 문제를 제출 하세요. GitHub bug 템플릿을 준수하고 다음을 포함하는지 확인하세요.

1. 버그 요약
2. 버그 재현을 위한 단계
3. 버그가 발생한 Chilli-Source 버전
4. 버그가 발생한 Chilli-Source 구성 또는 서비스 구성
