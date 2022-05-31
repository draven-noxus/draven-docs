# SpringBoot2.7.0

## 文档

```shell
# 链接：
# https://spring.io
# https://start.spring.io
# https://spring.io/guides/gs/spring-boot
# https://github.com/spring-projects/spring-boot
# https://github.com/spring-projects/spring-boot/wiki
# https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.7-Release-Notes
```

## New and Noteworthy

### New Spring GraphQL starter

### Support for RabbitStreamTemplate

### Hazelcast `@SpringAware` Support

### Operating System Information in Info endpoint

### Java Vendor Information in Info endpoint

### Opaque Token Introspection Without the OIDC SDK

### @DataCouchbaseTest

### @DataElasticsearchTest

### Auto-configuration for SAML2 logout

### Changes to Auto-configuration

#### Auto-configuration Registration

```html
If you have created your own auto-configurations, you should move the registration from `spring.factories` to a new file named `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`. Each line contains the fully qualified name of the auto-configuration. See [the included auto-configurations](https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot-autoconfigure/src/main/resources/META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports) for an example.
```

For backwards compatibility, entries in `spring.factories` will still be honored.

#### New @AutoConfiguration Annotation

```html
A new `@AutoConfiguration` annotation has been introduced. It should be used to annotate top-level auto-configuration classes that are listed in the new `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` file, replacing `@Configuration`. Configuration classes that are nested within or imported by an `@AutoConfiguration` class should continue to use `@Configuration` as before.

For your convenience, `@AutoConfiguration` also supports auto-configuration ordering via the `after`, `afterNames`, `before` and `beforeNames` attributes. This can be used as a replacement for `@AutoConfigureAfter` and `@AutoConfigureBefore`.
```



### Test Slice Configuration

### FailureAnalyzer Injection

### Redis Sentinel Username Support

### Overriding Built-in Sanitization

#### Podman Support

#### Cache2k Support

#### Simplified Registration of Jackson Mixins

#### Web Server SSL Configuration Using PEM-encoded Certificates



## Deprecations in Spring Boot 2.7

```html
Loading auto-configurations from `spring.factories` is deprecated. See above for more details.
`DatabaseDriver.GAE`
Properties under `spring.security.saml2.relyingparty.registration.{id}.identityprovider` have been moved to `spring.security.saml2.relyingparty.registration.{id}.assertingparty`. Using the old property names result in log messages on WARN level on startup.
```

